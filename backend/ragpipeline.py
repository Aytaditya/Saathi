from langchain_community.document_loaders import PyPDFLoader
from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.chat_models import init_chat_model
from langchain.prompts import PromptTemplate
import os
from dotenv import load_dotenv

load_dotenv()


async def process_pdf_and_chat(question: str):

    # Load and merge PDF content
    loader = PyPDFLoader("Saathi_Schemes_Info.pdf")
    pages = []
    async for page in loader.alazy_load():
        pages.append(page)

    full_text = "\n".join([p.page_content for p in pages])
    merged_doc = Document(page_content=full_text)

    # Split into chunks
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = splitter.split_documents([merged_doc])

    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
        google_api_key=os.getenv("GOOGLE_API_KEY")
    )
    vectordb = Chroma.from_documents(chunks, embedding=embeddings)

    llm = init_chat_model(
        "gemini-2.0-flash",
        model_provider="google_genai",
        google_api_key=os.getenv("GOOGLE_API_KEY")
    )

    # custom prompt template
    prompt_template = """
    Answer the question using only the context provided below. If the answer is not in the context, say "I cant answer that based on the provided context."

    Respond in Markdown format.

    Context:
    ---------
    {context}

    Question: {question}
    ---------
    Answer in markdown:
    """

    prompt = PromptTemplate(
        input_variables=["context", "question"],
        template=prompt_template,
    )

    retriever = vectordb.as_retriever()

    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        chain_type="stuff",  # simpler chain
        chain_type_kwargs={"prompt": prompt}
    )

    result = qa_chain.run(question)
    return result
