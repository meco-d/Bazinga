from datetime import datetime, timedelta, timezone
from typing import Annotated, List
from fastapi import Depends, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from sqlalchemy import text
from src.v1.database import DatabaseConnection
from passlib.context import CryptContext
from jose import JWTError, jwt
from src.v1.exceptions.exceptions import AuthenticationFailedException
from functools import lru_cache


class Oauth2Scheme:
    def __init__(self) -> None:
        self.oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class Token(BaseModel):
    access_token: str
    token_type: str
    role: str


class TokenData(BaseModel):
    username: str | None = None


class User(BaseModel):
    id: int
    username: str
    role: str | None = None
    permissions: List[str] | None = None
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None


class AuthService:
    def __init__(self) -> None:
        # to get a string like this run:
        # openssl rand -hex 32
        self.secret_key = (
            "a6fde2ff017a809034ee765515b33fe818e23faccff8d7ec684e98376817693f"
        )
        self.algorithm = "HS256"
        self.acess_token_expire_minutes = 240
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def authenticate_user(self, username: str, password: str):
        user = self.get_user_from_db(username)
        if not user:
            return False
        if not self.verify_password(password, user["password"]):
            return False
        return user

    @lru_cache(maxsize=8)
    def get_roles_permissions_list(self):
        pass

    @lru_cache(maxsize=8)
    def get_users_roles_list(self):
        connection = DatabaseConnection().get_connection()
        statement = text(
            """
        select u.username, r.name as role
        from users as u
        left join user_roles ur on u.id = ur.user_id
        left join roles r on ur.role_id = r.id
        """
        )
        result_list = connection.execute(statement).fetchall()

        result_dict = {key: value for key, value in result_list}

        return result_dict

    @lru_cache(maxsize=8)
    def get_users_collection(self):
        connection = DatabaseConnection().get_connection()
        statement = text(
            """
        select u.id, u.username, r.name as role, string_agg(DISTINCT p.name, ', ') AS permission
        from users as u
                left join user_roles ur on u.id = ur.user_id
                left join roles r on ur.role_id = r.id
                left join role_permissions rl on r.id = rl.role_id
                left join permissions p on rl.permission_id = p.id
        GROUP BY u.id, u.username, r.name
        """
        )
        result_list = connection.execute(statement).fetchall()
        # result_dicts = [dict(row) for row in result_list]

        result_dict = {
            item[1]: User(
                id=item[0],
                username=item[1],
                role=item[2],
                permissions=item[3].split(",") if item[3] else None,
            )
            for item in result_list
        }

        return result_dict

    def get_user_from_db(self, username: str):
        connection = DatabaseConnection().get_connection()
        statement = text("""
        select users.*,r.name as role
        from users
        left join user_roles ur on users.id = ur.user_id
        left join roles r on ur.role_id = r.id
        where username=:uname
                         """)
        statement = statement.bindparams(uname=username)
        result = connection.execute(statement).fetchone()._asdict()

        return result

    def get_user_for_token(self, username: str):
        user_roles_collection = self.get_users_collection()
        # connection = DatabaseConnection().get_connection()
        # statement = text("select * from users where username=:uname")
        # statement = statement.bindparams(uname=username)
        # result = connection.execute(statement).fetchone()._asdict()
        if username in user_roles_collection:
            return user_roles_collection[username]

        return None

    def get_roles_permissions_for_token(self, role):
        roles_permissions_collection = self.get_roles_permissions_list()
        # connection = DatabaseConnection().get_connection()
        # statement = text("select * from users where username=:uname")
        # statement = statement.bindparams(uname=username)
        # result = connection.execute(statement).fetchone()._asdict()

        if role in roles_permissions_collection:
            return roles_permissions_collection[role]

        return None

    def verify_password(self, plain_password, hashed_password):
        return self.pwd_context.verify(plain_password, hashed_password)

    def create_access_token(self, data: dict, expires_delta: timedelta | None = None):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
        return encoded_jwt

    def get_password_hash(self, password):
        return self.pwd_context.hash(password)

    def get_current_user(
        self, token: Annotated[str, Depends(Oauth2Scheme().oauth2_scheme)]
    ) -> User:
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])

            # check if username exists in token "sub"(subject)
            username: str = payload.get("sub")
            if username is None:
                raise AuthenticationFailedException
            token_data = TokenData(username=username)
        except JWTError:
            raise AuthenticationFailedException

        user = self.get_user_for_token(username)

        if user is None:
            raise AuthenticationFailedException
        return user

    def require_permission(self, required_permission: str):
        def permission_checker(user: User = Depends(self.get_current_user)):
            if required_permission not in user.permissions:
                raise AuthenticationFailedException()
            return user

        return permission_checker
