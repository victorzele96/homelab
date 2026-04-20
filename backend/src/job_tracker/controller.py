import sys
import os
import psycopg2

# 1. Get the absolute path of the current file (controller.py)
current_script_path = os.path.abspath(__file__)

# 2. Get the project root directory (/mnt/d/homelab)
project_root = os.path.dirname(os.path.dirname(current_script_path))

# 3. Define the exact path to the backend-api folder
backend_folder = os.path.join(project_root, 'src/backend-api')

# 4. Add the backend-api folder to sys.path so Python looks inside it
if backend_folder not in sys.path:
    sys.path.append(backend_folder)

from src.shared.base_controller import BaseController

class JobTrackerController(BaseController):
    def __init__(self):
        # Configure baseController
        super().__init__(db_name="job_tracker")
        
    def get_all_applications(self):
        query = "SELECT * FROM applications ORDER BY created_at DESC"
        return self.select_query(query)

    def add_application(self, application_data: dict):
        """
        Adds a new job application with notes.
        """
        query = """
            INSERT INTO applications (company_name, job_title, job_link, status, notes)
            VALUES (%s, %s, %s, %s, %s)
        """
        params = (
            application_data.get('company_name'),
            application_data.get('job_title'),
            application_data.get('job_link', ''),
            application_data.get('status', 'Applied'),
            application_data.get('notes')
        )
        
        return self.execute_action(
            query, 
            params=params, 
            success_msg=f"Job at {application_data.get('company_name')} added successfully"
        )

    def update_status(self, new_status, job_id):
        query = "UPDATE applications SET status = %s WHERE id = %s"
        return self.execute_action(query, params=(new_status, job_id))
    

    def remove_job(self, job_id):
        query = "DELETE FROM applications WHERE id = %s"
        return self.execute_action(query, params=(job_id,))
