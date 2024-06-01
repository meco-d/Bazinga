import logging
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, Response
from fastapi.responses import HTMLResponse, JSONResponse
import io

import httpx  # For BytesIO
from src.v1.modules.charging_stations.charging_stations_request_model import CreateChargingStationsRequestModel
from src.v1.modules.charging_stations.charging_stations_response_model import GetChargingStationsCollectionResponse, GetChargingStationsResponse
from src.v1.modules.charging_stations.charging_stations_service import ChargingStationService
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


@router.get("/charging-stations")
def get_charging_station_collection():
    charging_station_service = ChargingStationService()
    collection = charging_station_service.get_charging_station_collection()
    mapped_collection = helper.map_collection_response(
        collection_response_model=GetChargingStationsCollectionResponse, collection_list=collection
    )

    return mapped_collection


@router.get("/charging-stations/{id}")
def get_charging_station(id: int):
    charging_station_service = ChargingStationService()
    item = charging_station_service.get_charging_station(id)
    mapped_item = helper.map_item_response(
        collection_response_model=GetChargingStationsResponse, item=item
    )
    return mapped_item


@router.post("/charging-stations")
def create_charging_station(station: CreateChargingStationsRequestModel):
    charging_station_service = ChargingStationService()
    charging_station_service.create_charging_station(station)

    return {}


@router.patch("/charging-stations")
def update_charging_station(template_name: str, content: str):
    pass


@router.delete("/charging-stations/{charging_stations_id}")
def delete_charging_station(id: str):
    charging_station_service = ChargingStationService()
    user = charging_station_service.get_charging_station(id)
    if user:
        charging_station_service.delete_charging_station(id)


@router.get("/charging-stations/live-status")
async def get_charging_station_collection_status():
    #http call te flinku
    flink_url = os.getenv("FLINK_URL")
    with httpx.AsyncClient() as client:
        # Sending a GET request to the URL
        response = await client.get(url)
        
        # Check if the request was successful
        if response.status_code == 200:
            # Return the JSON response data
            return response.json()
        else:
            # Handle possible errors
            response.raise_for_status()
    pass

@router.get("/charging-stations/{id}/live-status")
def get_charging_station_status():
    #http call te flinku
    pass