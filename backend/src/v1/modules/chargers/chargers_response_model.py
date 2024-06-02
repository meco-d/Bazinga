from typing import List, Type, TypeVar


class GetChargerCollectionResponse:
    def __init__(
        self,
        charging_station_id: int,
        id: int,
        type: str,
        status: str,
        rated_power: str,
        created_at: str,
        updated_at: str,
    ):
        self.id = id
        self.charging_station_id = charging_station_id
        self.type = type
        self.status = status
        self.rated_power = rated_power
        self.created_at = created_at
        self.updated_at = updated_at


class GetChargerResponse:
    def __init__(
        self,
        charging_station_id: int,
        id: int,
        type: str,
        status: str,
        rated_power: str,
        created_at: str,
        updated_at: str,
    ):
        self.id = id
        self.charging_station_id = charging_station_id
        self.type = type
        self.status = status
        self.rated_power = rated_power
        self.created_at = created_at
        self.updated_at = updated_at
