#! /bin/sh

source ./.env
[ x"$USE_VENV" = xtrue ] && source ../venv/bin/activate

uvicorn src.v1.main:app --reload --host $UVICORN_HOST --port $UVICORN_PORT