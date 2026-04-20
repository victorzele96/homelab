import os
import psycopg2
from dotenv import load_dotenv

class DatabaseManager:
    def __init__(self, db_name=None):
        # Load local .env if running directly via WSL (Docker will override this automatically)
        load_dotenv()
        
        # Map the configuration using environment variables
        self.config = {
            "dbname": os.getenv("DB_NAME") or db_name,
            "user": os.getenv("DB_USER"),
            "password": os.getenv("DB_PASSWORD"),
            "host": os.getenv("DB_HOST", "localhost"), # Fallback to localhost for local dev
            "port": os.getenv("DB_PORT", "5444")
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