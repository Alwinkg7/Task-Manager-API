"# Task-Manager-API" 


Task Manager API
This is a FastAPI-based web application to manage users and tasks. The API allows users to register, create tasks, and manage task data, all stored in a SQLite database.

Features
User registration with username and password.
Task creation with title, description, and completion status.
SQLite database to store user and task data.
Simple CRUD API structure.
Requirements
Python 3.7+
FastAPI
SQLAlchemy
SQLite (database is automatically created)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/task-manager-api.git
Navigate into the project directory:

bash
Copy code
cd task-manager-api
Create a virtual environment (if you don't have one already):

bash
Copy code
python -m venv venv
Activate the virtual environment:

On Windows:
bash
Copy code
.\venv\Scripts\activate
On MacOS/Linux:
bash
Copy code
source venv/bin/activate
Install the required dependencies:

bash
Copy code
pip install -r requirements.txt
Usage
Start the FastAPI development server:

bash
Copy code
uvicorn app.main:app --reload
Visit the following in your browser to interact with the API:

Swagger UI: http://127.0.0.1:8000/docs
Redoc UI: http://127.0.0.1:8000/redoc
You can interact with the API using the endpoints:

POST /users/: Create a new user.
POST /tasks/: Create a new task.
Example API Requests
Create a User
POST /users/
json
Copy code
{
  "username": "john_doe",
  "password": "password123"
}
Create a Task
POST /tasks/
json
Copy code
{
  "title": "Finish FastAPI tutorial",
  "description": "Complete the FastAPI tutorial to learn the basics",
  "completed": false
}