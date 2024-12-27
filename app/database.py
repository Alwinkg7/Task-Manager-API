from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from contextlib import contextmanager

# Replace with your actual database URL
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"  # Example: SQLite URL

# Create engine and session maker
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create the base class for models
Base = declarative_base()

# Dependency to get the database session
@contextmanager
def get_db():
    db = SessionLocal()
    try:
        yield db  # Yield the session to the caller (e.g., route functions)
    finally:
        db.close()  # Ensure the session is closed after use
