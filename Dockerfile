# Dockerfile for Playwright Test Execution
# Use official Playwright image with pre-installed browsers

FROM mcr.microsoft.com/playwright:v1.40.0-jammy

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application files
COPY . .

# Set environment variables
ENV CI=true
ENV HEADLESS=true

# Run tests (can be overridden)
CMD ["npm", "test"]