from fastapi import APIRouter

# from src.endpoints import articles
from src.v1.modules.auth import auth_endpoints
from src.v1.modules.users import users
from src.v1.modules.charging_stations import charging_stations

api_router = APIRouter()

api_router.include_router(auth_endpoints.router, prefix="", tags=["auth"])
api_router.include_router(users.router, prefix="", tags=["users"])
api_router.include_router(charging_stations.router, prefix="", tags=["charging-stations"])

