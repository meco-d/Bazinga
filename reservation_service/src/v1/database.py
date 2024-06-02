from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()


class DatabaseConnection:
    def __init__(self):
        db_username = os.getenv("DATABASE_USER")
        db_pass = os.getenv("DATABASE_PASSWORD")
        db_host = os.getenv("DATABASE_HOST")
        db_name = os.getenv("DATABASE_NAME")
        db_DBAPI = os.getenv("DATABASE_DBAPI")

        connection_string = f"{db_DBAPI}://{db_username}:{db_pass}@{db_host}/{db_name}"

        # Engine will allow us to connect to a specific database.
        self.engine = create_engine(connection_string, echo=True)

        # Session will allow for the communication with the database.
        self.SessionLocal = sessionmaker(
            autocommit=False, autoflush=False, bind=self.engine
        )

        # Base class will be used on all the db models we will use later on.
        self.Base = declarative_base()

    # this will always get the session so when we
    # update/insert/get from the database we will be using this
    def get_db(self):
        db = self.SessionLocal()
        try:
            yield db
        finally:
            db.close()

    def get_connection(self):
        return self.engine.connect()
