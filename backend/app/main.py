from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.models.user import User
from app.models.analysis import AnalysisHistory
from app.routers.health import router as health_router
from app.routers.analyze import router as analyze_router
from app.routers.user import router as user_router

app = FastAPI(
    title="SEO Analyzer API",
    description="Backend API for Website SEO Analyzer",
    version="1.0.0",
)

# Serve screenshots folder
app.mount(
    "/screenshots",
    StaticFiles(directory="screenshots"),
    name="screenshots",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(health_router)
app.include_router(analyze_router)
app.include_router(user_router)

# Home
@app.get("/")
def home():
    return {
        "message": "Welcome to SEO Analyzer API 🚀"
    }