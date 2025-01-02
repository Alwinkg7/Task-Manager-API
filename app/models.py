from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Task(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, default=None)
    owner_id = Column(Integer, ForeignKey('users.id'))
    assigned_user_id = Column(Integer, ForeignKey('users.id'))  # Add this line

    # Relationships with foreign keys specified
    owner = relationship("User", back_populates="tasks", foreign_keys=[owner_id])
    assigned_user = relationship("User", back_populates="assigned_tasks", foreign_keys=[assigned_user_id])

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    # Relationship for tasks owned by the user
    tasks = relationship("Task", back_populates="owner", foreign_keys="Task.owner_id")

    # Relationship for tasks assigned to the user
    assigned_tasks = relationship("Task", back_populates="assigned_user", foreign_keys="Task.assigned_user_id")
