from functools import lru_cache
from typing import Optional, List
from fastapi import HTTPException
from datetime import datetime
import sqlalchemy as sa

from .request_model import InquiryKind, PlaceReservationRequestModel

from ...database import DatabaseConnection

class ReservationService:
    def __init__(self) -> None:
        pass
    
    def get_reservations(
        self,
        user_id: Optional[int] = None,
        charger_id: Optional[int] = None,
    ):
        with DatabaseConnection().get_connection() as connection:
            resv_table = self._resv_table(connection.engine)

            q = sa.select(resv_table).where(resv_table.c.active == True)

            if user_id is not None:
                q = q.where(resv_table.c.user_id == user_id)
            
            if charger_id is not None:
                q = q.where(resv_table.c.charger_id == charger_id)
            
            return connection.execute(q).fetchall()

    @lru_cache
    def _resv_table(self, engine):
        metadata = sa.MetaData()
        return sa.Table("reservation", metadata, schema="public", autoload_with=engine)
    
    TSRANGE_FUNC = {
        InquiryKind.EXACT: "=",
        InquiryKind.INTERSECT: "&&"
    }

    def inqiure_any_reservation(
        self,
        from_ts: datetime,
        to_ts: datetime,
        inqiury_kind: InquiryKind,
        chargers: Optional[List[int]] = None,
    ):
        """ Query the given time range to find whether there is any reservation overlapping. """
        with DatabaseConnection().get_connection() as connection:
            chargersq = f"AND reservation.charger_id IN :chargers"\
                if (chargers is not None and chargers != []) else ""

            q=sa.text(f"""
            SELECT * from reservation
            WHERE reservation.active AND tsrange(reservation.start_time, reservation.end_time) {self.TSRANGE_FUNC[inqiury_kind]}
                    tsrange(:start_inquiry, :end_inquiry) {chargersq}
            """)

            if chargers is not None:
                q = q.bindparams(sa.bindparam('chargers', expanding=True))

            result = connection.execute(
                q,
                {"start_inquiry": from_ts, "end_inquiry": to_ts,
                 **({"chargers": chargers} if chargers is not None else {})}
            ).fetchall()

            return result

    def is_valid_reservation(
        self, reservation: PlaceReservationRequestModel
    ) -> bool:
        return self.inqiure_any_reservation(
            from_ts=reservation.start_time,
            to_ts=reservation.end_time,
            inqiury_kind=InquiryKind.INTERSECT,
            chargers=[reservation.charger_id]) == []

    def place_reservation(
        self,
        reservation: PlaceReservationRequestModel,
    ):
        with DatabaseConnection().get_connection() as connection:
            resv_table = self._resv_table(connection.engine)
            q = sa.insert(resv_table).values(
                user_id=reservation.user_id,
                charger_id=reservation.charger_id,
                active=True,
                start_time=reservation.start_time,
                end_time=reservation.end_time
            )
            result = connection.execute(q)
            connection.commit()