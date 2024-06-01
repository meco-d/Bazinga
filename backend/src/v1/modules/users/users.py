import logging
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, Response
from fastapi.responses import HTMLResponse, JSONResponse
import io  # For BytesIO
from src.v1 import helper
from typing import Dict, List
import os
from datetime import datetime, timezone
from src.v1.modules.users.users_request_model import CreateUserRequestModel
from src.v1.modules.users.users_response_model import (
    GetUserCollectionResponse,
    GetUserResponse,
)
from src.v1.modules.users.users_service import UserService

helper.configure_logging()

router = APIRouter()


@router.get("/users")
def get_user_collection():
    user_service = UserService()
    collection = user_service.get_user_collection()
    mapped_collection = helper.map_collection_response(
        collection_response_model=GetUserCollectionResponse, collection_list=collection
    )

    return mapped_collection


@router.get("/users/{user_id}")
def get_user(user_id: int):
    user_service = UserService()
    item = user_service.get_user(user_id=user_id)
    mapped_item = helper.map_item_response(
        collection_response_model=GetUserResponse, item=item
    )
    return mapped_item


@router.post("/users")
def create_user(user: CreateUserRequestModel):
    user_service = UserService()
    user_service.create_user(user)


@router.patch("/users")
def update_user(template_name: str, content: str):
    pass


@router.delete("/users/{user_id}")
def delete_user(user_id: str):
    user_service = UserService()
    user = user_service.get_user(user_id)
    if user:
        user_service.delete_user(user_id)
