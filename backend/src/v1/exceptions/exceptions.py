from typing import Callable
from fastapi import Request
from fastapi.responses import JSONResponse
import logging  # For logging


class GeneralException(Exception):
    """Base exception class"""

    def __init__(self, message: str = "Service is unavailable") -> None:
        self.message = message
        super().__init__(self.message)


class AuthenticationFailedException(GeneralException):
    """Invalid authentication credentials"""

    pass


class ForbiddenRequestException(GeneralException):
    """Request is rejected because the client doesn't have rights on it"""

    pass


class PayloadTooLargeException(GeneralException):
    """Request payload is larger than the expected size"""

    pass


class BadRequestException(GeneralException):
    """Request is rejected"""


class ResourceNotFound(GeneralException):
    """Resource does not exist in the system"""

    pass


class OuterServiceError(GeneralException):
    """Outer service such as database servers or third party API-s can't be reached"""

    pass


class ServerError(GeneralException):
    """Server error response"""


def create_exception_handler(
    status_code: int, initial_detail: str
) -> Callable[[Request, GeneralException], JSONResponse]:
    detail = {"message": initial_detail}  # using a dictionary to hold the detail

    async def exception_handler(_: Request, exc: GeneralException) -> JSONResponse:
        if exc.message:
            detail["message"] = exc.message

        # if exc.name:
        #     detail["message"] = f"{detail['message']}[{exc.name}]"

        return JSONResponse(status_code=status_code, content=detail)

    return exception_handler
