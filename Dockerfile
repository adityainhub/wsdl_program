# Use Node.js LTS version
FROM node:20-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Make the startup script executable
RUN chmod +x start.sh

# Expose port
EXPOSE 8000

# Start both server and client
CMD ["./start.sh"] 