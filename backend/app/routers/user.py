from fastapi import APIRouter, HTTPException
from sqlalchemy import text

from app.database.database import SessionLocal
from app.schemas.user import UserRegister, UserLogin
from app.core.auth import hash_password, verify_password
from app.utils.jwt import create_access_token

router = APIRouter()


@router.post("/register")
def register(user: UserRegister):
    db = SessionLocal()

    existing = db.execute(
        text("SELECT * FROM users WHERE email=:email"),
        {"email": user.email},
    ).fetchone()

    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    db.execute(
        text(
            """
            INSERT INTO users(username,email,password)
            VALUES(:username,:email,:password)
            """
        ),
        {
            "username": user.username,
            "email": user.email,
            "password": hash_password(user.password),
        },
    )

    db.commit()
    db.close()

    return {"message": "User registered successfully"}


@router.post("/login")
def login(user: UserLogin):
    db = SessionLocal()

    result = db.execute(
        text("SELECT * FROM users WHERE email=:email"),
        {"email": user.email},
    ).fetchone()

    db.close()

    if not result:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(user.password, result.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": result.email})

    return {
        "access_token": token,
        "token_type": "bearer",
        "username": result.username,
    }