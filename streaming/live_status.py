from copy import deepcopy
from pyflink.common.serialization import SimpleStringSchema
from pyflink.common.typeinfo import Types
from pyflink.datastream import StreamExecutionEnvironment
from pyflink.datastream.connectors.kafka import FlinkKafkaConsumer
from pyflink.datastream.functions import MapFunction
from pyflink.datastream.state import ValueStateDescriptor

# Define the Flink execution environment
env = StreamExecutionEnvironment.get_execution_environment()
env.set_parallelism(1)  # Adjust the parallelism as needed

# Define the Kafka consumer properties
kafka_props = {
    'bootstrap.servers': 'kafka1:9092',
    'group.id': 'flink-group'
}

# Create a Kafka consumer for the 'charging-sessions' topic
kafka_consumer = FlinkKafkaConsumer(
    'charging-sessions',  # Kafka topic
    SimpleStringSchema(),  # Deserialization schema
    properties=kafka_props
)

# Add the Kafka consumer to the execution environment
charging_session_stream = env.add_source(kafka_consumer)

def parse_charging_session(value):
    return value

def update_charging_station_state(current_state, charging_session):
    current_state = deepcopy(current_state)
    charger_id = charging_session['charger_id']
    if charging_session.get('end_time') is not None:
        current_state[charger_id] = True
    else:
        current_state[charger_id] = False
    
    return current_state

# Define the stateful mapper function
class ChargingStationStatefulMapper(MapFunction):
    def open(self, runtime_context):
        # Initialize state
        self.state = self.get_runtime_context().get_state(
            ValueStateDescriptor("charging_station_state", Types.PICKLED_BYTE_ARRAY()))

    def map(self, value):
        # Retrieve current state
        current_state = self.state.value() or {}

        # Parse the JSON value into a ChargingSession object
        charging_session = parse_charging_session(value)

        # Update the state based on the incoming session
        update_charging_station_state(current_state, charging_session)

        # Update the state in Flink
        self.state.update(current_state)

        # Emit the updated state
        return current_state

# Register the stateful mapper function with PyFlink
charging_session_stream.map(ChargingStationStatefulMapper())

# Execute the Flink job
env.execute("ChargingStationStatusJob")
