import sys
import os
from pathlib import Path

# Add the src directory to the Python path
src_path = Path(__file__).parent / "src"
sys.path.insert(0, str(src_path))

# Change to the directory containing main.py
os.chdir(src_path)

# Import and run the FastAPI app with uvicorn
if __name__ == "__main__":
    import uvicorn
    import sys
    sys.path.insert(0, str(src_path))

    # Import the app from main module
    import main
    uvicorn.run(main.app, host="127.0.0.1", port=8000, reload=False)