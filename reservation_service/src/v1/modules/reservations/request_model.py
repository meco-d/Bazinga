from typing import Optional

from datetime import datetime, timezone
from enum import Enum
from pydantic import BaseModel, EmailStr
from .common_model import ReservationModel

class InquiryKind(str, Enum):
    EXACT = "EXACT"
    INTERSECT = "INTERSECT"

class PlaceReservationRequestModel(BaseModel):
    user_id: Optional[int]
    charger_id: Optional[int]
    start_time: Optional[datetime]
    end_time: Optional[datetime]