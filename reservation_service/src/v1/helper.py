import os
import logging
from pathlib import Path
from typing import List, Type, TypeVar

T = TypeVar("T")


def map_collection_response(collection_response_model: Type[T], collection_list: List):
    """
    Dynamically maps every collection from the database to the specific class
    :param collection_response_model: the name of the class which will be used as a mapping structure
    :param collection_list: the collection that was returned from the database
    """
    mapped_collection = [
        collection_response_model(*list(item)) for item in collection_list
    ]

    return mapped_collection


def map_item_response(collection_response_model: Type[T], item):
    """
    Dynamically maps the item row from the database to the specific class
    :param collection_response_model: the name of the class which will be used as a mapping structure
    :param collection_list: the collection that was returned from the database
    """
    mapped_item = collection_response_model(*list(item))

    return mapped_item


# Configure logging settings
def configure_logging():
    logging.basicConfig(
        level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
    )


def get_root_path():
    return str(Path(__file__).resolve().parents[1])
