import uvicorn
from fastapi import FastAPI
import os
import logging  # For logging
from dotenv import load_dotenv  # For environment variables
from src.v1 import router
from fastapi.middleware.cors import CORSMiddleware
from src.v1.exceptions.exceptions import *
from src.v1.schemas import schema_editor
from src.v1 import helper
from fastapi_keycloak_middleware import KeycloakConfiguration, setup_keycloak_middleware
from fastapi import status


# Initialize environment and logging
path_to_env_file = helper.get_root_path() + "/.env"
load_dotenv(path_to_env_file)
LOG_LEVEL = os.getenv("LOG_LEVEL", "info")
logging.basicConfig(level=LOG_LEVEL.upper())


# Set up Keycloak
# keycloak_config = KeycloakConfiguration(
#     url="http://192.168.0.212:8080/auth/",
#     realm="",
#     client_id="<Client ID>",
#     client_secret="<Client Secret>",
# )


app = FastAPI()


# Add middleware with basic config
# setup_keycloak_middleware(
#     app,
#     keycloak_configuration=keycloak_config,
# )


######################----------EXCEPTIONS
app.add_exception_handler(
    exc_class_or_status_code=BadRequestException,
    handler=create_exception_handler(status.HTTP_400_BAD_REQUEST, "Bad Request"),
)
app.add_exception_handler(
    exc_class_or_status_code=AuthenticationFailedException,
    handler=create_exception_handler(
        status.HTTP_401_UNAUTHORIZED, "Client is not authenticated"
    ),
)
app.add_exception_handler(
    exc_class_or_status_code=AuthenticationFailedException,
    handler=create_exception_handler(
        status.HTTP_401_UNAUTHORIZED, "Credentials aren't valid"
    ),
)
app.add_exception_handler(
    exc_class_or_status_code=ForbiddenRequestException,
    handler=create_exception_handler(
        status.HTTP_403_FORBIDDEN, "Client access is not allowed"
    ),
)
app.add_exception_handler(
    exc_class_or_status_code=ResourceNotFound,
    handler=create_exception_handler(
        status.HTTP_404_NOT_FOUND, "Resource does not exist"
    ),
)
app.add_exception_handler(
    exc_class_or_status_code=ServerError,
    handler=create_exception_handler(
        status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
        "Request payload is larger than expected",
    ),
)
app.add_exception_handler(
    exc_class_or_status_code=ServerError,
    handler=create_exception_handler(
        status.HTTP_500_INTERNAL_SERVER_ERROR, "Internal Server Error"
    ),
)
######################----------EXCEPTIONS


######################----------ROUTES
app.include_router(router.api_router)
######################----------ROUTES


######################----------DOCS
app.openapi_schema = schema_editor.set_openapi_spec(app.openapi_schema, app.routes)
######################----------DOCS


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
def get_homepage():
    return {
        "Response": "This is the home page. For more details and to view the API documentation, please visit /docs."
    }


# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)
