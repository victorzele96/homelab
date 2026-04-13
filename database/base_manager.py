import os
import psycopg2
from dotenv import load_dotenv

class DatabaseManager:
    def __init__(self, db_name=None):
        # 1. Locate the absolute path of the 'database' folder
        # (Where this base_manager.py lives)
        base_path = os.path.dirname(os.path.abspath(__file__))
        
        # 2. Dynamically build the path to the sub-folder .env
        # If db_name is 'job_tracker', it looks in 'database/job_tracker_db/.env'
        env_folder = f"{db_name}_db"
        env_path = os.path.join(base_path, env_folder, ".env")
        
        # 3. Load the specific environment variables
        if os.path.exists(env_path):
            load_dotenv(env_path, override=True)
        else:
            print(f"Warning: .env file not found at {env_path}")

        # 4. Map the configuration
        self.config = {
            "dbname": os.getenv("DB_NAME") or db_name,
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

    def get_connection(self):
        # We wrap this in try-except to get a clearer error message
        try:
            conn = psycopg2.connect(**self.config)
            print(f"Connected Successfully to {self.config['dbname']}!")
            return conn
        except Exception as e:
            print(f"Connection failed for {self.config['dbname']}: {e}")
            raise