from fastapi import HTTPException
from src.v1.modules.charging_stations.charging_stations_request_model import CreateChargingStationsRequestModel, create_model
from src.v1.database import DatabaseConnection
from datetime import datetime, timedelta, timezone
from sqlalchemy import text

import sqlalchemy as sa

from src.v1.modules.auth.auth_service import AuthService
from src.v1.modules.users.users_request_model import (
    CreateUserDbModel,
    CreateUserRequestModel,
    create_user_model,
)


class ChargingStationService:
    def __init__(self) -> None:
        pass

    def create_charging_station(self, station: CreateChargingStationsRequestModel):
        try:

            connection = DatabaseConnection().get_connection()
            statement = text(
                """
            INSERT INTO charging_stations (user_id, name, status, country, city, latitude, longitude, created_at, updated_at)
            VALUES (:uid, :n, :s, :co, :ci, :la, :lo, :created_at, :updated_at)
            """
            )

            station = create_model(station)
            statement = statement.bindparams(
                uid=station.userId,
                n=station.name,
                s=station.status,
                co=station.country,
                ci=station.city,
                la=station.latitude,
                lo=station.longitude,
                created_at=station.created_at,
                updated_at=station.updated_at,
            )
            connection.execute(statement)
            connection.commit()
            connection.close()
        except Exception as exc:
            connection.rollback()
            raise HTTPException(status_code=500, detail=exc)

    def update_charging_station(self):
        pass

    def get_charging_station(self, id: int):
        connection = DatabaseConnection().get_connection()
        statement = text(
            """
            SELECT * FROM charging_stations WHERE id = :id
            """
        )
        result_item = connection.execute(statement, {"id": id}).fetchone()
        connection.close()

        return result_item

    def get_charging_station_collection(self):
        connection = DatabaseConnection().get_connection()
        statement = text(
            """
        select * from charging_stations
        """
        )
        result_list = connection.execute(statement).fetchall()
        connection.close()


        return result_list

    def delete_charging_station(self, id):
        connection = DatabaseConnection().get_connection()
        statement = text(
            """
            DELETE FROM charging_stations WHERE id = :id
            """
        )

        connection.execute(statement, {"id": id})
        connection.commit()
        connection.close()



# def get_reservations(
#         self,
#         user_id: Optional[int] = None,
#         charger_id: Optional[int] = None,
#     ):
#         metadata = sa.MetaData()
#         dbcon = DatabaseConnection()
#         with dbcon.get_connection() as connection:
#             resv_table = sa.Table("reservation", metadata, schema="public", autoload_with=dbcon.engine)

#             q = sa.select(resv_table)

#             if user_id is not None:
#                 q = q.where(resv_table.user_id == user_id)
            
#             if charger_id is not None:
#                 q = q.where(resv_table.charger_id == charger_id)
            
#             return connection.execute(q).fetchall()