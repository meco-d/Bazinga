from fastapi import HTTPException
from src.v1.modules.chargers.chargers_request_model import CreateChargerRequestModel, create_model
from src.v1.database import DatabaseConnection
from datetime import datetime, timedelta, timezone
from sqlalchemy import text

from src.v1.modules.auth.auth_service import AuthService
from src.v1.modules.users.users_request_model import (
    CreateUserDbModel,
    CreateUserRequestModel,
    create_user_model,
)


class ChargerService:
    def __init__(self) -> None:
        pass

    def create_charger(self, charger: CreateChargerRequestModel):
        try:
            connection = DatabaseConnection().get_connection()
            statement = text(
                """
            INSERT INTO chargers (charging_station_id, type, status, rated_power, created_at, updated_at)
            VALUES (:csi, :t, :s, :r, :created_at, :updated_at)
            """
            )

            charger = create_model(charger)
            statement = statement.bindparams(
                csi=charger.charging_station_id,
                t=charger.type,
                s=charger.status,
                r=charger.rated_power,
                created_at=charger.created_at,
                updated_at=charger.updated_at,
            )
            connection.execute(statement)
            connection.commit()
            connection.close()
        except Exception as exc:
            connection.rollback()
            raise HTTPException(status_code=500, detail=exc)

    def update_charger(self):
        pass

    def get_charger(self, id: int):
        connection = DatabaseConnection().get_connection()
        statement = text(
            """
            SELECT * from chargers WHERE id = :id
            """
        )
        result_item = connection.execute(statement, {"id": id}).fetchone()

        return result_item

    def get_charger_collection(self):
        connection = DatabaseConnection().get_connection()
        statement = text(
            """
        select * from chargers
        """
        )
        result_list = connection.execute(statement).fetchall()
        connection.close()

        return result_list

    def delete_charger(self, charger_id):
        connection = DatabaseConnection().get_connection()
        statement = text(
            """
            DELETE FROM users WHERE id = :user_id
            """
        )

        connection.execute(statement, {"user_id": user_id})
        connection.commit()
        connection.close()
