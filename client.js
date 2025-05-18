const soap = require('soap');
const readline = require('readline');

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// URL to the WSDL
const url = 'http://localhost:8000/calculator?wsdl';

// Function to get user input
function promptUser() {
    console.log('\nCalculator SOAP Client');
    console.log('1. Add numbers');
    console.log('2. Subtract numbers');
    console.log('3. Exit');
    
    rl.question('Choose an operation (1-3): ', (choice) => {
        switch(choice) {
            case '1':
                performAdd();
                break;
            case '2':
                performSubtract();
                break;
            case '3':
                console.log('Goodbye!');
                rl.close();
                return;
            default:
                console.log('Invalid choice. Please try again.');
                promptUser();
        }
    });
}

// Function to perform addition
function performAdd() {
    rl.question('Enter first number: ', (num1) => {
        rl.question('Enter second number: ', (num2) => {
            soap.createClient(url, function(err, client) {
                if (err) {
                    console.error('Error creating client:', err);
                    promptUser();
                    return;
                }

                client.add({a: parseInt(num1), b: parseInt(num2)}, function(err, result) {
                    if (err) {
                        console.error('Error calling add:', err);
                    } else {
                        console.log(`${num1} + ${num2} = ${result.result}`);
                    }
                    promptUser();
                });
            });
        });
    });
}

// Function to perform subtraction
function performSubtract() {
    rl.question('Enter first number: ', (num1) => {
        rl.question('Enter second number: ', (num2) => {
            soap.createClient(url, function(err, client) {
                if (err) {
                    console.error('Error creating client:', err);
                    promptUser();
                    return;
                }

                client.subtract({a: parseInt(num1), b: parseInt(num2)}, function(err, result) {
                    if (err) {
                        console.error('Error calling subtract:', err);
                    } else {
                        console.log(`${num1} - ${num2} = ${result.result}`);
                    }
                    promptUser();
                });
            });
        });
    });
}

// Start the application
console.log('Connecting to SOAP service...');
promptUser(); 