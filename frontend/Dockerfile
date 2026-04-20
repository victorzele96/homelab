# Base react image
FROM node:20-alpine AS build

# Env variable
ENV NODE_ENV=development

# Set working directory
WORKDIR /frontend

# Set ownership to non-root user for security and write permissions
RUN chown -R node:node /frontend

# Switch to node
USER node

# Copy Dependencies
COPY --chown=node:node package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy rest of the project code
COPY --chown=node:node . .

# Expose Vite port
EXPOSE 5173

# Run the frontend
CMD ["npm", "run", "dev", "--", "--host"]
