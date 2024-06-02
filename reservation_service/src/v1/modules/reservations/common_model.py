from typing import Optional
from datetime import datetime

from pydantic import BaseModel

class ReservationModel(BaseModel):
    id: int
    user_id: Optional[int]
    charger_id: Optional[int]
    active: Optional[bool]
    start_time: Optional[datetime]
    end_time: Optional[datetime]
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True