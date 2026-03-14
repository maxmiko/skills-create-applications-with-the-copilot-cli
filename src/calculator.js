#!/usr/bin/env node

/**
 * Simple Calculator CLI
 * Supports the following operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (*)
 * - Division (/)
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Calculator functions
const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  },
};

function calculate(num1, operator, num2) {
  if (!operations[operator]) {
    throw new Error(`Invalid operator: ${operator}. Supported operators are: +, -, *, /`);
  }

  const a = parseFloat(num1);
  const b = parseFloat(num2);

  if (isNaN(a) || isNaN(b)) {
    throw new Error('Invalid number provided');
  }

  return operations[operator](a, b);
}

function promptUser() {
  rl.question(
    '\nEnter calculation (e.g., "5 + 3") or "quit" to exit:\n> ',
    (input) => {
      if (input.toLowerCase() === 'quit') {
        console.log('\nGoodbye!');
        rl.close();
        return;
      }

      try {
        const parts = input.trim().split(/\s+/);

        if (parts.length !== 3) {
          console.log(
            'Invalid format. Please use: "number operator number" (e.g., "10 * 2")'
          );
        } else {
          const [num1, operator, num2] = parts;
          const result = calculate(num1, operator, num2);
          console.log(`${num1} ${operator} ${num2} = ${result}`);
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }

      promptUser();
    }
  );
}

console.log('Welcome to the Calculator CLI!');
console.log('Supported operations: + (addition), - (subtraction), * (multiplication), / (division)');
promptUser();
