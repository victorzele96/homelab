import os
import psycopg2
from dotenv import load_dotenv

class DatabaseManager:
    def __init__(self, db_name=None):
        # 1. Look for .env in the current working directory where the script is run
        # This ensures that if you are in /job_tracker, it loads /job_tracker/.env
        load_dotenv(os.path.join(os.getcwd(), '.env'))
        
        # 2. Use the DB_NAME from .env if it exists, otherwise use the passed argument
        final_db_name = os.getenv("DB_NAME") or db_name
        
        self.config = {
            "dbname": final_db_name,
            "user": os.getenv("DB_USER"),
            "password": os.getenv("DB_PASSWORD"),
            "host": os.getenv("DB_HOST"),
            "port": os.getenv("DB_PORT")
        }

    def run_query(self, query, success_message="Query executed successfully"):
        conn = None
        try:
            # Check if critical config is missing
            if not self.config["dbname"] or not self.config["password"]:
                raise ValueError("Database configuration is missing. Check your .env file.")
                
            conn = psycopg2.connect(**self.config)
            cur = conn.cursor()
            cur.execute(query)
            conn.commit()
            cur.close()
            print(f"[{self.config['dbname']}] {success_message}")
        except Exception as e:
            print(f"Error executing query on {self.config.get('dbname', 'Unknown DB')}: {e}")
        finally:
            if conn:
                conn.close()

    # Bonus: Add a method to run files directly
    def run_sql_file(self, file_path):
        try:
            with open(file_path, 'r') as f:
                query = f.read()
            self.run_query(query, f"Successfully executed script from {file_path}")
        except FileNotFoundError:
            print(f"Error: SQL file not found at {file_path}")