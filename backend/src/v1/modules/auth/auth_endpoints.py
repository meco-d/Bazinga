from datetime import datetime, timedelta, timezone
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, status, APIRouter
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from src.v1.database import DatabaseConnection
from sqlalchemy import text
from src.v1.exceptions.exceptions import AuthenticationFailedException
from src.v1.modules.auth.auth_service import AuthService, User, Token


router = APIRouter()


@router.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    try:
        auth_service = AuthService()
        user = auth_service.authenticate_user(form_data.username, form_data.password)
        if not user:
            raise AuthenticationFailedException()
        access_token_expires = timedelta(
            minutes=auth_service.acess_token_expire_minutes
        )
        access_token = auth_service.create_access_token(
            data={"sub": user["username"], "subId": user["id"]},
            expires_delta=access_token_expires,
        )
        return JSONResponse(
            Token(access_token=access_token, token_type="bearer", role=user["role"]).model_dump(), 200
        )
    except Exception as ex:
        raise HTTPException(status_code=500, detail=ex)


@router.get("/protected-route-test/")
async def protected_route(
    current_user: User = Depends(AuthService().require_permission("sample:write")),
):
    return {
        "message": "You have access to this protected route",
        "user": current_user.username,
    }
