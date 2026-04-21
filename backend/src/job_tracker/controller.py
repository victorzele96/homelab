import sys
import os
import psycopg2
from datetime import datetime

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
    
    def update_application(self, job_id, updated_job: dict):
        try:
            print(f"DEBUG: Received update for ID {job_id}: {updated_job}")
            query = """UPDATE applications 
                        SET company_name=%s, job_title=%s, job_link=%s, status=%s, notes=%s, last_updated=%s 
                        WHERE id=%s
                    """
            params = (
                updated_job.get('company_name'),
                updated_job.get('job_title'),
                str(updated_job.get('job_link', '')),
                updated_job.get('status'),
                updated_job.get('notes'),
                datetime.now(),
                job_id
            )

            return self.execute_action(
                query, 
                params=params, 
                success_msg=f"Job at {updated_job.get('company_name')} updated successfully"
            )
        except Exception as e:
            print(f"!!! CRITICAL ERROR in update_application: {str(e)}")
            return None