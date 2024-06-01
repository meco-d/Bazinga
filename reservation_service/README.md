# Service


## Steps to set it up

### Clone project

```bash
git clone git@github.com:
```

### Setup project

```bash
cd CleaningLezhe/
python3/python/py -m venv venv
source venv/bin/activate
```

### If you are using windows

```
venv\Scripts\activate
```

### Install the required libraries

```
pip install -r requirements.txt
```

## Run project

```bash
uvicorn src.v1.main:app --reload --host 0.0.0.0 --port 8000
```

## Build container using docker compose
```bash
docker compose -f docker-compose.yml up --build
```