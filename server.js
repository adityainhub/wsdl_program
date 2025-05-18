const soap = require('soap');
const express = require('express');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();
app.use(bodyParser.raw({ type: function() { return true; }, limit: '5mb' }));
app.use(express.json());

// Add middleware to log SOAP-specific information
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    if (req.url.includes('?wsdl')) {
        console.log(`[${timestamp}] Client requesting WSDL definition`);
    } else if (req.method === 'POST') {
        console.log(`[${timestamp}] SOAP request received from ${req.ip}`);
    }
    next();
});

// Define the service
const service = {
    CalculatorService: {
        CalculatorPort: {
            add: function(args) {
                const timestamp = new Date().toISOString();
                console.log(`[${timestamp}] SOAP operation: add`);
                console.log(`SOAP request parameters: a=${args.a}, b=${args.b}`);
                
                const n1 = parseInt(args.a);
                const n2 = parseInt(args.b);
                const result = n1 + n2;
                
                console.log(`SOAP response: result=${result}`);
                return { result: result };
            },
            subtract: function(args) {
                const timestamp = new Date().toISOString();
                console.log(`[${timestamp}] SOAP operation: subtract`);
                console.log(`SOAP request parameters: a=${args.a}, b=${args.b}`);
                
                const n1 = parseInt(args.a);
                const n2 = parseInt(args.b);
                const result = n1 - n2;
                
                console.log(`SOAP response: result=${result}`);
                return { result: result };
            }
        }
    }
};

// Read the WSDL file
const xml = require('fs').readFileSync('calculator.wsdl', 'utf8');

// Create the server
const server = app.listen(8000, '0.0.0.0', function() {
    console.log('SOAP Server running at http://0.0.0.0:8000');
    console.log('WSDL available at: http://0.0.0.0:8000/calculator?wsdl');
    console.log('Waiting for SOAP clients to connect...');
});

// Create the SOAP server
soap.listen(app, '/calculator', service, xml);

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

// Handle