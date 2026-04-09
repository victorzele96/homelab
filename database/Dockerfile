# database/Dockerfile

# Using the slim version of Python 3.12 for a smaller image size
FROM python:3.12-slim

# Set the working directory inside the container
WORKDIR /database

# Copy requirements file first to leverage Docker layer caching
COPY requirements.txt .

# Install Python dependencies without caching to keep the image slim
RUN pip install --no-cache-dir -r requirements.txt

# Copy all files from the current directory (database/) into the container (/database)
# This includes base_manager.py and all subdirectories
COPY . .

# No CMD defined here. This allows us to pass the specific script 
# we want to run (Job Tracker or Chat AI) during runtime.