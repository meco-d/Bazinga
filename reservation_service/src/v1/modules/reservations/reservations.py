from typing import Dict, List, Optional
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, Response
from fastapi.responses import HTMLResponse, JSONResponse
import io  # For BytesIO
from src.v1 import helper
import os
from datetime import datetime, timezone

from .service import ReservationService
from .request_model import PlaceReservationRequestModel, InquiryKind
from .common_model import ReservationModel

helper.configure_logging()

router = APIRouter()


@router.get('/reservations', response_model=List[ReservationModel])
def get_reservations(
    charger_id: Optional[int] = None,
    user_id: Optional[int] = None
) -> List[ReservationModel]:
    service = ReservationService()
    return service.get_reservations(
        charger_id=charger_id,
        user_id=user_id
    )


@router.get('/reservations/inquiry', response_model=List[ReservationModel])
def inquire_reservation(
    start_time: datetime,
    end_time: datetime,
    inquiry_kind: InquiryKind = InquiryKind.INTERSECT,
) -> List[ReservationModel]:
    """ Inquire on any used up spots """
    service = ReservationService()
    return service.inqiure_any_reservation(
        start_time, end_time,
        inqiury_kind=inquiry_kind
    )


@router.post('/reservations')
def place_reservation(request: PlaceReservationRequestModel):
    service = ReservationService()
    request.start_time = request.start_time.replace(tzinfo=None)
    request.end_time = request.end_time.replace(tzinfo=None)
    
    # Do some validation :) !
    if not service.is_valid_reservation(request):
        raise HTTPException(403, { "message": "Spot already filled" })

    return service.place_reservation(
        reservation=request
    )


@router.get('/reservations/{id}')
def get_reservation(id: int):
    ...


@router.delete('/reservation/{id}')
def delete_reservation(id: int):
    """ Make a reservation inactive """
    ...


@router.post('/reservation/{id}')
def consume_reservation(id: int):
    ...