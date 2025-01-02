from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db
from app.dependencies import get_current_user

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.post("/tasks/tasks", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    try:
        db_task = models.Task(
            title=task.title,
            description=task.description,
            owner_id=task.owner_id,
            assigned_user_id=task.assigned_user_id,
        )
        db.add(db_task)
        db.commit()
        db.refresh(db_task)
        return db_task
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating task: {str(e)}")



@router.get("/tasks/tasks", response_model=List[schemas.Task])
def get_tasks(db: Session = Depends(get_db), current_user: schemas.UserLogin = Depends(get_current_user)):
    # Get tasks for the current user (either as an owner or assigned user)
    tasks = db.query(models.Task).filter(
        (models.Task.owner_id == current_user.id) |
        (models.Task.assigned_user_id == current_user.id)
    ).all()
    return tasks


@router.put("/tasks/{task_id}", response_model=schemas.Task)
def update_task(
        task_id: int,
        task: schemas.TaskUpdate,
        db: Session = Depends(get_db),
        current_user: models.User = Depends(get_current_user)
):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    if db_task.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this task")

    # Update task fields
    db_task.title = task.title
    db_task.description = task.description
    db_task.completed = task.completed
    db.commit()
    db.refresh(db_task)

    return db_task


@router.delete("/tasks/{task_id}", status_code=204)
def delete_task(
        task_id: int,
        db: Session = Depends(get_db),
        current_user: models.User = Depends(get_current_user)
):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    if db_task.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this task")

    db.delete(db_task)
    db.commit()

    return {"detail": "Task deleted successfully"}


@router.put("/tasks/assign/{task_id}", response_model=schemas.Task)
def assign_task(
        task_id: int,
        user_id: int,
        db: Session = Depends(get_db),
        current_user: models.User = Depends(get_current_user)
):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    if db_task.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to assign this task")

    db_task.assigned_user_id = user_id
    db.commit()
    db.refresh(db_task)

    return db_task


@router.patch("/tasks/complete/{task_id}", response_model=schemas.Task)
def complete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    if db_task.owner_id != current_user.id and db_task.assigned_user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to mark this task as complete")

    db_task.completed = True
    db.commit()
    db.refresh(db_task)

    return db_task