from fastapi import APIRouter

# from src.endpoints import articles
from .modules.reservations import reservations_router

api_router = APIRouter()

api_router.include_router(reservations_router, prefix="", tags=["reservations"])
