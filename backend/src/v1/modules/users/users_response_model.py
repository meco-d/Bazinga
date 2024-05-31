from typing import List, Type, TypeVar


class GetUserCollectionResponse:
    id: str
    username: str
    email: str

    def __init__(self, id: str, username: str, email: str):
        self.id = id
        self.username = username
        self.email = email


class GetUserResponse:
    id: str
    username: str
    email: str

    def __init__(self, id: str, username: str, email: str):
        self.id = id
        self.username = username
        self.email = email
