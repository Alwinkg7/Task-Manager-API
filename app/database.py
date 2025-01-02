from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# Use environment variable for production database URL (Replace with your actual database URL)
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"  # Example: SQLite URL

# Create the SQLAlchemy engine with the database URL and options
# For SQLite, `check_same_thread=False` is necessary because SQLite is not thread-safe by default
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# Create the sessionmaker that will be used to create new session objects
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all models (for inheritance in models)
Base = declarative_base()

# Dependency to get the database session in route functions
def get_db():
    db = SessionLocal()  # Create a new session
    try:
        yield db  # Return the session to the caller (used in FastAPI route functions)
    finally:
        db.close()  # Ensure the session is closed after use
