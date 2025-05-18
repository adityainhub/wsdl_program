# SOAP Calculator Web Service

A simple SOAP web service that provides calculator operations (addition and subtraction) with both server and client implementations.

## Table of Contents
- [Features](#features)
- [Method 1: Using Docker](#method-1-using-docker)
- [Method 2: Direct Installation](#method-2-direct-installation)
- [API Documentation](#api-documentation)
- [Testing the Service](#testing-the-service)
- [Troubleshooting](#troubleshooting)

## Features
- SOAP-based web service
- Calculator operations (add, subtract)
- Interactive client with command-line interface
- Docker support for easy deployment
- Detailed logging of operations

## Method 1: Using Docker

### Prerequisites
- Docker installed on your system
- Docker Desktop (for Windows/Mac users)

### Quick Start with Docker
1. Pull the image:
```bash
docker pull adityaindoc/soap-calculator:latest
```

2. Run the server:
```bash
docker run -p 8000:8000 adityaindoc/soap-calculator:latest
```

The service will be available at:
- SOAP endpoint: http://localhost:8000/calculator
- WSDL: http://localhost:8000/calculator?wsdl

### Using Docker Compose
1. Create a docker-compose.yml:
```yaml
services:
  soap-calculator:
    image: yourusername/soap-calculator:latest
    ports:
      - "8000:8000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

2. Run with docker-compose:
```bash
docker-compose up
```

## Method 2: Direct Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)

### Installation Steps
1. Clone the repository:
```bash
git clone https://github.com/yourusername/soap-calculator.git
cd soap-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node server.js
```

4. In a new terminal, run the client:
```bash
node client.js
```


### Using the Client
The client provides a menu-driven interface:
1. Choose operation (1: Add, 2: Subtract, 3: Exit)
2. Enter first number
3. Enter second number
4. View result

## Testing the Service

### Using the Provided Client
```bash
# If using Docker:
docker exec -it [container_id] node client.js

# If installed directly:
node client.js
```

### Using SOAP UI
1. Create a new SOAP project
2. Use WSDL URL: http://localhost:8000/calculator?wsdl
3. Test the available operations

## Troubleshooting

### Docker Issues
1. "Container not starting":
   - Check Docker Desktop is running
   - Verify port 8000 is not in use
   ```bash
   docker logs [container_id]
   ```

2. "Cannot connect to service":
   - Ensure correct port mapping
   - Check firewall settings

### Direct Installation Issues
1. "Module not found":
   ```bash
   npm install
   ```

2. "Port already in use":
   - Change port in server.js
   - Or stop the process using port 8000

### Common Solutions
- Restart Docker/Node.js
- Check logs: `docker logs [container_id]`
- Verify WSDL availability: http://localhost:8000/calculator?wsdl

