from mcp.server.fastmcp import FastMCP
from langchain_community.tools.tavily_search import TavilySearchResults
from pymongo import MongoClient
import os
import getpass
from dotenv import load_dotenv

load_dotenv()

# Initialize MCP server
mcp = FastMCP("Saathi")


# Load MongoDB connection
# MONGO_URI = os.getenv("MONGO_URI")
# client = MongoClient(MONGO_URI)
# db = client["saathi"]
# users = db["users"]

# ------------------- 🔧 TOOL 1: Search for New Schemes ------------------- #
@mcp.tool()
def search_new_schemes(query: str = "Search for newly launched government schemes in India.") -> list:
    """
    Search the internet for newly launched government schemes in India using Tavily.
    This tool is useful when the user asks about any recent or upcoming schemes.
    Returns titles, summaries, and links to official announcements.
    """
    search = TavilySearchResults(k=5)
    results = search.run(query)
    return results

# ------------------- 🔧 TOOL 2: Fetch User Info from MongoDB ------------------- #
# @mcp.tool()
# def get_user_from_mongodb(email: str) -> dict:
#     """
#     Fetch user data by email from MongoDB.
#     Returns {found: True, user: {...}} or {found: False}
#     """
#     user = users.find_one({"email": email})
#     if user:
#         user.pop("_id")  # Remove MongoDB’s internal ID field
#         return {"found": True, "user": user}
#     return {"found": False, "user": None}

# # ------------------- 🔧 TOOL 3: Insert New User into MongoDB ------------------- #
# @mcp.tool()
# def insert_user_if_not_found(user: dict) -> str:
#     """
#     Insert user into MongoDB if not already present.
#     Input is full user dictionary with at least an email field.
#     """
#     email = user.get("email")
#     if not email:
#         return "Missing email in user data."
#     existing = users.find_one({"email": email})
#     if existing:
#         return "User already exists."
#     users.insert_one(user)
#     return "User inserted successfully."

# # ------------------- 🔧 TOOL 4: Rule-Based Eligibility Checker ------------------- #
# @mcp.tool()
# def check_eligibility(user: dict, schemes: list) -> list:
#     """
#     Basic rule-based scheme eligibility checker.
#     Matches user attributes against scheme descriptions.
#     """
#     age = user.get("age", 0)
#     income = user.get("income", 0)
#     occupation = user.get("occupation", "").lower()
#     gender = user.get("gender", "").lower()
#     state = user.get("state", "").lower()

#     eligible = []
#     for scheme in schemes:
#         title = scheme.get("title", "")
#         snippet = scheme.get("snippet", "").lower()

#         if "student" in snippet and occupation == "student":
#             eligible.append(title)
#         elif "entrepreneur" in snippet and income < 500000:
#             eligible.append(title)
#         elif "women" in snippet and gender == "female":
#             eligible.append(title)
#         elif "farmer" in snippet and "land" in user and user["land"] is True:
#             eligible.append(title)

#     return eligible


if __name__ == "__main__":
    mcp.run(transport="stdio")
