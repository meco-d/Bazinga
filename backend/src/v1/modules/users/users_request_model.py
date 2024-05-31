from datetime import datetime, timezone
from pydantic import BaseModel, EmailStr


class CreateUserRequestModel(BaseModel):
    username: str
    email: EmailStr
    password: str


class CreateUserDbModel(CreateUserRequestModel):
    created_at: str
    updated_at: str


def create_user_model(user: CreateUserRequestModel) -> CreateUserDbModel:
    """Get the extraExtension model and return it. Will be used as a default value for one of the request fields"""
    user = user.model_dump()
    base_model = CreateUserDbModel(
        **user,
        created_at=datetime.now()
        .replace(tzinfo=timezone.utc)
        .strftime("%Y-%m-%dT%H:%M:%S"),
        updated_at=datetime.now()
        .replace(tzinfo=timezone.utc)
        .strftime("%Y-%m-%dT%H:%M:%S"),
    )
    return base_model
