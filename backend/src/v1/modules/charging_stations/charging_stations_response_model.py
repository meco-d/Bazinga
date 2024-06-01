from typing import List, TypeVar

from pydantic import BaseModel


class GetChargingStationsCollectionResponse:
    def __init__(
        self,
        id: int,
        name: str,
        type: str,
        status: str,
        rated_power: str,
        country: str,
        city: str,
        latitude: float,
        longitude: float,
        created_at: str,
        updated_at: str,
    ):
        self.id = id
        self.name = name
        self.type = type
        self.status = status
        self.rated_power = rated_power
        self.country = country
        self.city = city
        self.latitude = latitude
        self.longitude = longitude
        self.created_at = created_at
        self.updated_at = updated_at

    # (7, 'string', 'One-Phase', 'In use', 'rated', 'countr', 'city', 0.0, 0.0, datetime.datetime(2024, 6, 1, 17, 41, 39), datetime.datetime(2024, 6, 1, 17, 41, 39))


class GetChargingStationsResponse:
    def __init__(
        self,
        id: int,
        name: str,
        type: str,
        status: str,
        rated_power: str,
        country: str,
        city: str,
        latitude: float,
        longitude: float,
        created_at: str,
        updated_at: str,
    ):
        self.id = id
        self.name = name
        self.type = type
        self.status = status
        self.rated_power = rated_power
        self.country = country
        self.city = city
        self.latitude = latitude
        self.longitude = longitude
        self.created_at = created_at
        self.updated_at = updated_at
