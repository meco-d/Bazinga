from fastapi import APIRouter

# from src.endpoints import articles
from src.v1.modules.auth import auth_endpoints
from src.v1.modules.users import users

api_router = APIRouter()

api_router.include_router(auth_endpoints.router, prefix="", tags=["auth"])
api_router.include_router(users.router, prefix="", tags=["users"])
