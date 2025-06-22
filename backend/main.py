from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.document_loaders import PyPDFLoader
from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.chat_models import init_chat_model
import os
import asyncio
from dotenv import load_dotenv
from ragpipeline import process_pdf_and_chat


load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/chat")
async def chat(question: str = Query(...)):
    answer = await process_pdf_and_chat(question)
    return {"answer": answer}