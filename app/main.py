from fastapi import FastAPI
from app.database import engine, Base
from app.routers import tasks, users

app = FastAPI()

# Create all database tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(tasks.router)
app.include_router(users.router)
