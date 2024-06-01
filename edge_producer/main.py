import os
import json
import random
import time
from datetime import datetime, timedelta
from kafka import KafkaProducer

# Get configuration from environment variables or use defaults
kafka_host = os.getenv('KAFKA_HOST', 'localhost')
kafka_port = os.getenv('KAFKA_PORT', '9092')
interval_minutes = float(os.getenv('CHARGING_SESSION_INTERVAL', 20))

# Define the Kafka producer
producer = KafkaProducer(
    bootstrap_servers=f'{kafka_host}:{kafka_port}',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

# Function to generate a random charging session start event
def generate_start_event():
    session = {
        'session_id': random.randint(1000, 9999),
        'station_id': random.choice([1, 2, 3]),
        'charger_id': random.choice([ 1, 2, 3]),
        'user_id': random.randint(100, 999),
        'start_time': datetime.utcnow().isoformat(),
        'end_time': None,
        'energy_consumed': 0.0  # Energy consumption starts at 0
    }
    return session

# Function to generate a corresponding end event for a given start event
def generate_end_event(start_event):
    end_event = start_event.copy()
    end_event['end_time'] = (datetime.utcnow() + timedelta(minutes=int(interval_minutes * random.randint(1, 3)))).isoformat()
    end_event['energy_consumed'] = round(random.uniform(5.0, 50.0), 2)  # Total energy consumed
    return end_event

# Produce messages to the Kafka topic 'charging-sessions'
topic = 'charging-sessions'

try:
    while True:
        # Generate a mock charging session start event
        start_event = generate_start_event()
        
        # Send the start event to Kafka
        r = producer.send(topic, value=start_event)
        record_metadata = r.get(timeout=10)
        
        # Print the produced start event
        print(f'Produced start event: {start_event}')
        
        # Wait for a random interval before producing the end event
        time_to_wait = interval_minutes * random.randint(1, 3)  # Wait for 1x, 2x, or 3x the interval

        print(f'Waiting for {time_to_wait} minutes before sending end event...')
        producer.flush()
        time.sleep(time_to_wait * 60)  # Convert minutes to seconds
        # time.sleep(4)
        
        # Generate the corresponding end event
        end_event = generate_end_event(start_event)
        
        # Send the end event to Kafka
        r = producer.send(topic, value=end_event) 
        record_metadata = r.get(timeout=10)

        # Print the produced end event
        print(f'Produced end event: {end_event}')
        
        # Wait for a short interval before producing the next start event
        print('Waiting for a short interval before producing the next start event...')
        time.sleep(random.uniform(0.5, 2.0) * 60)  # Convert minutes to seconds
        # time.sleep(4)
except KeyboardInterrupt:
    print("Stopping the producer.")
finally:
    producer.close()
