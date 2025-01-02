from pydantic import BaseModel
from typing import List, Optional

# Pydantic model for Task
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None

# Define TaskCreate schema
class TaskCreate(BaseModel):
    title: str
    description: str = None
    assigned_user_id: int
    owner_id: int
    class Config:
        from_attributes = True  # This tells Pydantic to treat this as ORM (SQLAlchemy) model

class TaskUpdate(BaseModel):
    title: Optional[str] = None  # Optional, so you can update only the provided fields
    description: Optional[str] = None
    assigned_user_id: Optional[int] = None

    class Config:
        from_attributes = True  # This tells Pydantic to treat this as an ORM model

# Pydantic model for Task with ID (used for responses)
class Task(TaskBase):
    id: int
    owner_id: int
    assigned_user_id: int

    class Config:
        from_attributes = True  # Tells Pydantic to treat ORM objects as dictionaries

# Pydantic model for User
class UserBase(BaseModel):
    username: str

# Pydantic model for User with ID (used for responses)
class User(UserBase):
    id: int
    tasks: List[Task] = []  # List of tasks owned by the user
    assigned_tasks: List[Task] = []  # List of tasks assigned to the user

    class Config:
        from_attributes = True  # Tells Pydantic to treat ORM objects as dictionaries

# Pydantic model for creating a new user (excluding the password)
class UserCreate(UserBase):
    password: str  # Password will be required for registration

# Pydantic model for user login (only username and password)
class UserLogin(BaseModel):
    username: str
    password: str

# Pydantic model for the Token (JWT token response)
class Token(BaseModel):
    access_token: str
    token_type: str
