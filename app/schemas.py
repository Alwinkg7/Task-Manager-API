from pydantic import BaseModel
from typing import List, Optional

# Base class for all task-related schemas
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool = False

# Schema for creating a task (inherits from TaskBase)
class TaskCreate(TaskBase):
    pass

# Main Task schema returned by API
class Task(TaskBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True  # Use 'from_attributes' instead of 'orm_mode'

# Base class for all user-related schemas
class UserBase(BaseModel):
    username: str

# Schema for creating a user (inherits from UserBase)
class UserCreate(UserBase):
    password: str

# Main User schema returned by API
class User(UserBase):
    id: int
    tasks: List[Task] = []

    class Config:
        from_attributes = True  # Use 'from_attributes' instead of 'orm_mode'
