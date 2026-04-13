import sys
import os
import psycopg2
from fastapi import HTTPException
from typing import Optional, Any

# 1. Get the absolute path of the current file (controller.py)
current_script_path = os.path.abspath(__file__)

# 2. Get the project root directory (/mnt/d/homelab)
project_root = os.path.dirname(os.path.dirname(os.path.dirname(current_script_path)))

# 3. Define the exact path to the database folder
database_folder = os.path.join(project_root, 'database')

# 4. Add the database folder to sys.path so Python looks inside it
if database_folder not in sys.path:
    sys.path.append(database_folder)

# Now Python can find base_manager.py which is inside the database folder
from base_manager import DatabaseManager

class BaseController:
    def __init__(self, db_name):
        self.db = DatabaseManager(db_name=db_name)

    def select_query(self, query: str, params: Optional[tuple] = None):
        """
        """
        conn = None
        try:
            conn = self.db.get_connection()
            cur = conn.cursor()
            cur.execute(query, params or ())
            
            # Convert to (JSON-ready)
            columns = [desc[0] for desc in cur.description]
            results = [dict(zip(columns, row)) for row in cur.fetchall()]
            
            cur.close()
            return results
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Read error: {str(e)}")
        finally:
            if conn:
                conn.close()

    # def update_status(self, job_id, new_status):
    #     query = "UPDATE applications SET status = %s WHERE id = %s"
    #     return self.execute_action(query, params=(new_status, job_id))

    def execute_action(self, query: str, params: Optional[tuple] = None, success_msg: str = "Action completed"):
        """
        Execute function (INSERT/UPDATE/DELETE).
        Uses db run query.
        """
        try:
            conn = self.db.get_connection()
            cur = conn.cursor()
            cur.execute(query, params or ())
            conn.commit()
            cur.close()
            conn.close()
            return {"status": "success", "message": success_msg}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    def handle_error(self, error):
        """Standardized error handling"""
        print(f"Error in Controller: {error}")
        return {"status": 500, "message": str(error)}


    # db = DatabaseManager(db_name="chat_ai")
    # conn = db.get_connection()
    # cur = conn.cursor()
    # cur.close()
    # print("Successfully imported DatabaseManager!")