import sys
import os
from contextlib import asynccontextmanager

# Add the src directory to sys.path to handle imports properly
src_dir = os.path.dirname(os.path.abspath(__file__))
if src_dir not in sys.path:
    sys.path.insert(0, src_dir)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import modules using absolute paths within the same package
from routers import task, task_v2, auth
from db.init_db import create_db_and_tables

# Initialize database tables using lifespan event handler
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    create_db_and_tables()
    yield
    # Shutdown (if needed)

app = FastAPI(title="Task Manager API", lifespan=lifespan)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:3005",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:3002",
        "http://127.0.0.1:3003",
        "http://127.0.0.1:3005",
        "https://task-manager-dashboard-nu.vercel.app",
        "https://task-manager-dashboard-umemasultans-projects.vercel.app",
        "https://task-manager-dashboard-umemasultan-umemasultans-projects.vercel.app",
        "https://umemasultan11-phase-2.hf.space",
        "http://umemasultan11-phase-2.hf.space"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(task.router)  # Keep old router for compatibility
app.include_router(task_v2.router)  # New spec-compliant router
app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"message": "Task Manager API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)