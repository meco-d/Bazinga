import logging
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, Response
from fastapi.responses import HTMLResponse, JSONResponse
import io  # For BytesIO
from src.v1.modules.chargers.chargers_request_model import CreateChargerRequestModel
from src.v1.exceptions.exceptions import ResourceNotFound
from src.v1.modules.chargers.chargers_response_model import GetChargerCollectionResponse, GetChargerResponse
from src.v1.modules.chargers.chargers_service import ChargerService
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


@router.get("/chargers")
def get_charger_collection():
    charger_service = ChargerService()
    collection = charger_service.get_charger_collection()
    mapped_collection = helper.map_collection_response(
        collection_response_model=GetChargerCollectionResponse, collection_list=collection
    )

    return mapped_collection


@router.get("/chargers/{id}")
def get_charger(id: int):
    charger_service = ChargerService()
    item = charger_service.get_charger(id)
    if item:
        mapped_item = helper.map_item_response(
            collection_response_model=GetChargerResponse, item=item
        )
    else:
        raise ResourceNotFound
    return mapped_item


@router.post("/chargers")
def create_charger(charger: CreateChargerRequestModel):
    charger_service = ChargerService()
    charger_service.create_charger(charger)


@router.patch("/chargers")
def update_charger(charger: str, content: str):
    pass


@router.delete("/chargers/{id}")
def delete_charger(id: str):
    user_service = UserService()
    user = user_service.get_user(user_id)
    if user:
        user_service.delete_user(user_id)
