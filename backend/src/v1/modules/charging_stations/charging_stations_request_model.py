from datetime import datetime, timezone
from enum import Enum
from pydantic import BaseModel, EmailStr, Field


class Type(str, Enum):
    onephase='One-Phase'
    threephase='Three-Phase'

class Status(str, Enum):
    inUse = 'In use'
    free = 'Free'
    broken = 'Broken'
    underMaintenance = 'Under maintenance'

class CreateChargingStationsRequestModel(BaseModel):
    name: str
    type: Type
    status: Status
    rated_power: str
    country: str
    city: str
    latitude: float
    longitude: float


class CreateChargingStationsDbModel(CreateChargingStationsRequestModel):
    created_at: str
    updated_at: str


def create_model(model: CreateChargingStationsRequestModel) -> CreateChargingStationsDbModel:
    """Get the extraExtension model and return it. Will be used as a default value for one of the request fields"""
    model = model.model_dump()
    base_model = CreateChargingStationsDbModel(
        **model,
        created_at=datetime.now()
        .replace(tzinfo=timezone.utc)
        .strftime("%Y-%m-%dT%H:%M:%S"),
        updated_at=datetime.now()
        .replace(tzinfo=timezone.utc)
        .strftime("%Y-%m-%dT%H:%M:%S"),
    )
    return base_model
