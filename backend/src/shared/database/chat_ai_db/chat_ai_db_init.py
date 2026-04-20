import sys
import os

# 1. Adding the parent directory (DB/) to the system path
# This allows importing base_manager even though it's one level up
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.src.shared.database.base_manager import DatabaseManager

def init_chat_ai():
    # 2. Initialize the manager. 
    # It will automatically load the .env file from the chat_ai/ folder.
    db = DatabaseManager(db_name="chat_ai")

    # 3. SQL query for Chat AI logic
    query = """
    -- Enable pgcrypto for UUID generation
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    CREATE TABLE IF NOT EXISTS chat_history (
        id SERIAL PRIMARY KEY,
        session_id UUID DEFAULT gen_random_uuid(),
        role VARCHAR(20) NOT NULL, -- 'user', 'assistant', 'system'
        content TEXT NOT NULL,
        model_name VARCHAR(50),
        tokens_used INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    """
    
    db.run_query(query, "Chat AI table and extensions are ready!")

if __name__ == "__main__":
    init_chat_ai()