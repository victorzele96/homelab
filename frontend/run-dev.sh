#!/bin/bash

# Image name and container
IMAGE_NAME="job-tracker-frontend:dev"
CONTAINER_NAME="job-tracker-frontend-dev"

echo "🚀 Starting development environment for Job Tracker..."

# Check and remove dupkication with the same name
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "🔄 Removing old container..."
    docker rm -f $CONTAINER_NAME
fi

# run container
docker run -it \
  --name $CONTAINER_NAME \
  -p 5173:5173 \
  -v "$(pwd):/frontend" \
  -v /frontend/node_modules \
  --env NODE_ENV=development \
  $IMAGE_NAME   