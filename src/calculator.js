#!/usr/bin/env node

/**
 * Simple Calculator CLI
 * Supports the following operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (*)
 * - Division (/)
 * - Modulo (%)
 * - Exponentiation (^)
 * - Square Root (sqrt)
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Calculator functions
const modulo = (a, b) => {
  if (b === 0) {
    throw new Error('Cannot perform modulo with zero');
  }
  return a % b;
};

const power = (base, exponent) => {
  return Math.pow(base, exponent);
};

const squareRoot = (n) => {
  if (n < 0) {
    throw new Error('Cannot calculate square root of negative number');
  }
  return Math.sqrt(n);
};

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
  '%': modulo,
  '^': power,
};

function calculate(num1, operator, num2 = null) {
  if (operator === 'sqrt') {
    const a = parseFloat(num1);
    if (isNaN(a)) {
      throw new Error('Invalid number provided');
    }
    return squareRoot(a);
  }

  if (!operations[operator]) {
    throw new Error(`Invalid operator: ${operator}. Supported operators are: +, -, *, /, %, ^`);
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

        if (parts[0].toLowerCase() === 'sqrt' && parts.length === 2) {
          const [operator, num] = parts;
          const result = calculate(num, operator);
          console.log(`sqrt(${num}) = ${result}`);
        } else if (parts.length === 3) {
          const [num1, operator, num2] = parts;
          const result = calculate(num1, operator, num2);
          console.log(`${num1} ${operator} ${num2} = ${result}`);
        } else {
          console.log(
            'Invalid format. Please use: "number operator number" (e.g., "10 * 2") or "sqrt number" (e.g., "sqrt 16")'
          );
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }

      promptUser();
    }
  );
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    modulo,
    power,
    squareRoot,
    calculate,
    operations,
  };
}

// Only run the CLI if this is the main module
if (require.main === module) {
  console.log('Welcome to the Calculator CLI!');
  console.log('Supported operations:');
  console.log('  + (addition), - (subtraction), * (multiplication), / (division)');
  console.log('  % (modulo), ^ (exponentiation), sqrt (square root)');
  promptUser();
}
