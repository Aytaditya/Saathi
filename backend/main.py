from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from langchain_mcp_adapters.client import MultiServerMCPClient
from langgraph.prebuilt import create_react_agent
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
import asyncio, os

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


class AgentRequest(BaseModel):
    question: str
    email: str


agent = None

# @app.on_event("startup")
# async def init_agent():
#     global agent
#     client = MultiServerMCPClient({
#         "saathi": {
#             "command": "python",
#             "args": ["saathi_server.py"],
#             "transport": "stdio"
#         }
#     })
#     tools = await client.get_tools()
#     model = ChatGoogleGenerativeAI(model="gemini-2.0-flash")
#     agent = create_react_agent(model, tools)


@app.get("/chat")
async def chat(question: str):
    answer = await process_pdf_and_chat(question)
    return {"answer": answer}


@app.post("/agent")
async def agent_chat(body: AgentRequest):
    global agent
    if not agent:
        return {"error": "Agent not ready. Please try again."}

    prompt = {
        "messages": [
            {
                "role": "user",
                "content": {body.question}
            }
        ]
    }

    result = await agent.ainvoke(prompt)
    if isinstance(result, dict) and "messages" in result:
        return {"answer": result["messages"][-1].content}
    else:
        return {"error": "Unexpected agent response format"}

