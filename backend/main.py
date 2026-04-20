# backend/src/main.py
from pathlib import Path
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.job_tracker.router import router as job_router


app = FastAPI(
    title="HomeLab API",
    description="Backend",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(job_router, prefix="/jobs", tags=["Job Tracker"])

@app.get("/")
async def root():
    return {"message": "HomeLab API is running"}

if __name__ == "__main__":
    # run app on port 8000
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)