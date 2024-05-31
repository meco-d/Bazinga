# 
FROM python:3.10 as base-image

# 
WORKDIR /code

# 
COPY ./requirements.txt /code/requirements.txt

# 
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 
COPY ./src /code/src

EXPOSE 80 
# 
CMD ["uvicorn", "src.v1.main:app", "--host", "0.0.0.0", "--port", "80"]