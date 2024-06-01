from fastapi import HTTPException
from src.v1.database import DatabaseConnection
from datetime import datetime, timedelta, timezone
from sqlalchemy import text

from src.v1.modules.auth.auth_service import AuthService
from src.v1.modules.users.users_request_model import (
    CreateUserDbModel,
    CreateUserRequestModel,
    create_user_model,
)


class UserService:
    def __init__(self) -> None:
        pass

    def create_user(self, user: CreateUserRequestModel):
        try:
            auth_service = AuthService()
            user.password = auth_service.get_password_hash(user.password)

            connection = DatabaseConnection().get_connection()
            statement = text(
                """
            INSERT INTO users (username, email, password, created_at, updated_at)
            VALUES (:username, :email, :password, :created_at, :updated_at)
            """
            )

            user = create_user_model(user)
            statement = statement.bindparams(
                username=user.username,
                email=user.email,
                password=user.password,
                created_at=user.created_at,
                updated_at=user.updated_at,
            )
            connection.execute(statement)
            connection.commit()
        except Exception as exc:
            connection.rollback()
            raise HTTPException(status_code=500, detail=exc)

    def update_user(self):
        pass

    def get_user(self, user_id: int):
        connection = DatabaseConnection().get_connection()
        statement = text(
            """
            SELECT id, username, email FROM users WHERE id = :user_id
            """
        )
        result_item = connection.execute(statement, {"user_id": user_id}).fetchone()

        return result_item

    def get_user_collection(self):
        connection = DatabaseConnection().get_connection()
        statement = text(
            """
        select id, username, email from users
        """
        )
        result_list = connection.execute(statement).fetchall()

        return result_list

    def delete_user(self, user_id):
        connection = DatabaseConnection().get_connection()
        statement = text(
            """
            DELETE FROM users WHERE id = :user_id
            """
        )

        connection.execute(statement, {"user_id": user_id})
        connection.commit()
