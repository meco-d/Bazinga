from datetime import datetime, timezone
from enum import Enum
from pydantic import BaseModel, EmailStr


class Type(str, Enum):
    onephase='One-Phase'
    threephase='Three-Phase'

class Status(str, Enum):
    inUse = 'In use'
    free = 'Free'
    broken = 'Broken'
    underMaintenance = 'Under maintenance'

class CreateChargerRequestModel(BaseModel):
    charging_station_id: int
    type: Type
    status: Status
    rated_power: str


class CreateChargerDbModel(CreateChargerRequestModel):
    created_at: str
    updated_at: str


def create_model(user: CreateChargerRequestModel) -> CreateChargerDbModel:
    """Get the extraExtension model and return it. Will be used as a default value for one of the request fields"""
    user = user.model_dump()
    base_model = CreateChargerDbModel(
        **user,
        created_at=datetime.now()
        .replace(tzinfo=timezone.utc)
        .strftime("%Y-%m-%dT%H:%M:%S"),
        updated_at=datetime.now()
        .replace(tzinfo=timezone.utc)
        .strftime("%Y-%m-%dT%H:%M:%S"),
    )
    return base_model
