import sys
import os
import psycopg2

# 1. Get the absolute path of the current file (controller.py)
current_script_path = os.path.abspath(__file__)

# 2. Get the project root directory (/mnt/d/homelab)
project_root = os.path.dirname(os.path.dirname(current_script_path))

# 3. Define the exact path to the database folder
backend_folder = os.path.join(project_root, 'src/backend-api')

# 4. Add the database folder to sys.path so Python looks inside it
if backend_folder not in sys.path:
    sys.path.append(backend_folder)

from shared.base_controller import BaseController

class JobTrackerController(BaseController):
    def __init__(self):
        # Configure baseController
        super().__init__(db_name="job_tracker")
        
    def get_all_applications(self):
        query = "SELECT * FROM applications ORDER BY created_at DESC"
        return self.select_query(query)

    def add_application(self, application_data: dict):
        """
        Adds a new job application to the database.
        application_data: A dictionary containing company_name, job_title, tech_stack, etc.
        """
        
        # Tech Stack Manipulation:
        # If the input is a comma-separated string, convert it to a list.
        # Psycopg2 will automatically map a Python list to a PostgreSQL array (TEXT[]).
        tech_stack = application_data.get('tech_stack')
        if tech_stack and isinstance(tech_stack, str):
            tech_stack = [t.strip() for t in tech_stack.split(',')]

        query = """
            INSERT INTO applications (company_name, job_title, tech_stack, status)
            VALUES (%s, %s, %s, %s)
        """
        
        # Mapping the data to positional parameters for SQL injection prevention
        params = (
            application_data.get('company_name'),
            application_data.get('job_title'),
            tech_stack,
            application_data.get('status', 'Applied') # Default status if not provided
        )
        
        return self.execute_action(
            query, 
            params=params, 
            success_msg=f"Job at {application_data.get('company_name')} added successfully"
        )

    def update_status(self, new_status, job_id):
        query = "UPDATE applications SET status = %s WHERE id = %s"
        return self.execute_action(query, params=(new_status, job_id))
