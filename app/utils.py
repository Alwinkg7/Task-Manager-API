from typing import Optional
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import os  # For environment variables
from app import models, schemas

# Initialize password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Secret key for JWT encoding and decoding (use environment variables for better security)
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")  # Default for testing, replace with a secure key in prod
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # Set the expiration time for the token (can be modified if needed)

# Hash a password
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Verify the password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Create access token
def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Verify the access token and return payload or raise an exception
def verify_access_token(token: str) -> Optional[dict]:
    try:
        # Decode the token using the secret key and algorithm
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        # Handle expired token case by raising an exception (optional)
        raise JWTError("Token has expired")
    except jwt.InvalidTokenError:
        # Handle invalid token case by raising an exception (optional)
        raise JWTError("Invalid token")
