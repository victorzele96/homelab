import sys
import os

# 1. Adding the parent directory (DB/) to the system path so we can import base_manager
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from base_manager import DatabaseManager

def init_job_tracker():
    # 2. DatabaseManager will automatically load the .env from the current folder
    db = DatabaseManager(db_name="job_tracker")

    query = """
    CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        company_name VARCHAR(255) NOT NULL,
        job_title VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'Applied',
        tech_stack TEXT[],
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    """
    
    db.run_query(query, "Job Tracker table is ready!")

if __name__ == "__main__":
    init_job_tracker()