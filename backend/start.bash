# @echo off

REM Load environment variables from .env file
for /f "tokens=1,* delims==" %%A in ('.env') do set "%%A=%%B"

REM Check if USE_VENV is set to true and activate the virtual environment
if "%USE_VENV%"=="true" (
    call ..\venv\Scripts\activate
)

REM Run the uvicorn server with specified host and port
uvicorn src.v1.main:app --reload --host %UVICORN_HOST% --port %UVICORN_PORT%