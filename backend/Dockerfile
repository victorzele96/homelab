FROM python:3.12-slim

# Install system dependencies for PostgreSQL
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Setting a clear, descriptive working directory
WORKDIR /backend

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the entire backend project into /backend
COPY . .

# Set PYTHONPATH to include /backend and the src directory
# This ensures imports like 'from src.shared...' work perfectly
ENV PYTHONPATH="/backend:/backend/src:${PYTHONPATH}"

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]