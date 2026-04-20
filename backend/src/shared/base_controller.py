import sys
import os
import psycopg2
from fastapi import HTTPException
from typing import Optional, Any

# Try to import DatabaseManager using the package structure.
# This works when running main.py from the /backend directory.
try:
    from src.shared.database.base_manager import DatabaseManager
except ImportError:
    # Fallback for running scripts locally from within internal subdirectories.
    # Moves 3 levels up from base_controller.py to reach the /backend root.
    # Path: base_controller.py (0) -> shared (1) -> src (2) -> backend (3)
    import sys
    import os
    sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../..")))
    from src.shared.database.base_manager import DatabaseManager

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