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

class ChatAIController(BaseController):
    def __init__(self):
        # Configure baseController
        super().__init__(db_name="chat_ai")