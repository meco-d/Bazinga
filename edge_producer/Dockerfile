# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir kafka-python

# Make port 9092 available to the world outside this container
EXPOSE 9092

# Define an environment variable
ENV CHARGING_SESSION_INTERVAL=20

# Run charging_session_producer.py when the container launches
CMD ["python", "charging_session_producer.py"]