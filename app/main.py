from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.database import engine, Base
from app.routers.users import router as users_router
from app.routers.tasks import router as tasks_router  # Importing the router directly

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add all necessary frontend origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include routers for API endpoints
app.include_router(users_router, prefix="/users", tags=["users"])
app.include_router(tasks_router, prefix="/tasks", tags=["tasks"])

# Debugging route for root (optional)
@app.get("/")
async def root():
    return {"message": "Welcome to the API!"}

# Ensure all database tables are created
Base.metadata.create_all(bind=engine)

# Startup event to create database tables
@app.on_event("startup")
async def on_startup():
    print("App startup: Ensuring database tables are created.")

class Task(BaseModel):
    name: str
    description: str
# Task creation endpoint
@app.post("/tasks/")
async def create_task(task: Task):
    # Your logic to handle task creation
    return {"message": "Task created successfully", "task": task}