#!/bin/sh
# Start the server in the background
node server.js &

# Wait for server to start
sleep 5

# Start the client
node client.js 