const {
  modulo,
  power,
  squareRoot,
  calculate,
  operations,
} = require('./calculator');

describe('Calculator Operations', () => {
  describe('Basic Operations', () => {
    test('addition: 5 + 3 should equal 8', () => {
      expect(calculate('5', '+', '3')).toBe(8);
    });

    test('subtraction: 10 - 4 should equal 6', () => {
      expect(calculate('10', '-', '4')).toBe(6);
    });

    test('multiplication: 5 * 3 should equal 15', () => {
      expect(calculate('5', '*', '3')).toBe(15);
    });

    test('division: 20 / 4 should equal 5', () => {
      expect(calculate('20', '/', '4')).toBe(5);
    });

    test('division by zero should throw error', () => {
      expect(() => calculate('10', '/', '0')).toThrow('Cannot divide by zero');
    });
  });

  describe('Modulo Operation', () => {
    test('modulo: 5 % 2 should equal 1', () => {
      expect(modulo(5, 2)).toBe(1);
    });

    test('modulo: 10 % 3 should equal 1', () => {
      expect(modulo(10, 3)).toBe(1);
    });

    test('modulo: 17 % 5 should equal 2', () => {
      expect(modulo(17, 5)).toBe(2);
    });

    test('modulo: 7 % 2 should equal 1', () => {
      expect(modulo(7, 2)).toBe(1);
    });

    test('modulo with negative numbers: -5 % 2 should equal -1', () => {
      expect(modulo(-5, 2)).toBe(-1);
    });

    test('modulo: 0 % 5 should equal 0', () => {
      expect(modulo(0, 5)).toBe(0);
    });

    test('modulo by zero should throw error', () => {
      expect(() => modulo(10, 0)).toThrow('Cannot perform modulo with zero');
    });

    test('modulo via calculate: 10 % 3 should equal 1', () => {
      expect(calculate('10', '%', '3')).toBe(1);
    });
  });

  describe('Power (Exponentiation) Operation', () => {
    test('power: 2 ^ 3 should equal 8', () => {
      expect(power(2, 3)).toBe(8);
    });

    test('power: 5 ^ 2 should equal 25', () => {
      expect(power(5, 2)).toBe(25);
    });

    test('power: 10 ^ 0 should equal 1', () => {
      expect(power(10, 0)).toBe(1);
    });

    test('power: 2 ^ 10 should equal 1024', () => {
      expect(power(2, 10)).toBe(1024);
    });

    test('power with negative exponent: 2 ^ -1 should equal 0.5', () => {
      expect(power(2, -1)).toBe(0.5);
    });

    test('power with negative base: (-2) ^ 3 should equal -8', () => {
      expect(power(-2, 3)).toBe(-8);
    });

    test('power with decimal: 4 ^ 0.5 should equal 2 (square root)', () => {
      expect(power(4, 0.5)).toBe(2);
    });

    test('power via calculate: 2 ^ 3 should equal 8', () => {
      expect(calculate('2', '^', '3')).toBe(8);
    });
  });

  describe('Square Root Operation', () => {
    test('square root: √16 should equal 4', () => {
      expect(squareRoot(16)).toBe(4);
    });

    test('square root: √25 should equal 5', () => {
      expect(squareRoot(25)).toBe(5);
    });

    test('square root: √2 should be approximately 1.414', () => {
      expect(squareRoot(2)).toBeCloseTo(1.414, 2);
    });

    test('square root: √0 should equal 0', () => {
      expect(squareRoot(0)).toBe(0);
    });

    test('square root: √1 should equal 1', () => {
      expect(squareRoot(1)).toBe(1);
    });

    test('square root: √100 should equal 10', () => {
      expect(squareRoot(100)).toBe(10);
    });

    test('square root of negative number should throw error', () => {
      expect(() => squareRoot(-5)).toThrow('Cannot calculate square root of negative number');
    });

    test('square root of negative number -1 should throw error', () => {
      expect(() => squareRoot(-1)).toThrow('Cannot calculate square root of negative number');
    });

    test('square root via calculate: sqrt 16 should equal 4', () => {
      expect(calculate('16', 'sqrt')).toBe(4);
    });

    test('square root via calculate with negative should throw error', () => {
      expect(() => calculate('-9', 'sqrt')).toThrow('Cannot calculate square root of negative number');
    });
  });

  describe('Error Handling', () => {
    test('invalid operator should throw error', () => {
      expect(() => calculate('5', '&', '3')).toThrow('Invalid operator');
    });

    test('non-numeric input should throw error', () => {
      expect(() => calculate('abc', '+', '3')).toThrow('Invalid number provided');
    });

    test('non-numeric second operand should throw error', () => {
      expect(() => calculate('5', '+', 'xyz')).toThrow('Invalid number provided');
    });

    test('invalid number for sqrt should throw error', () => {
      expect(() => calculate('abc', 'sqrt')).toThrow('Invalid number provided');
    });
  });

  describe('Edge Cases', () => {
    test('very large numbers: 1000000 * 1000000 should work', () => {
      expect(calculate('1000000', '*', '1000000')).toBe(1000000000000);
    });

    test('very small numbers: 0.0001 + 0.0002 should equal 0.0003', () => {
      expect(calculate('0.0001', '+', '0.0002')).toBeCloseTo(0.0003, 5);
    });

    test('negative numbers: -5 + 3 should equal -2', () => {
      expect(calculate('-5', '+', '3')).toBe(-2);
    });

    test('floating point division: 10 / 3 should equal approximately 3.333', () => {
      expect(calculate('10', '/', '3')).toBeCloseTo(3.333, 2);
    });

    test('power of very large exponent: 2 ^ 20 should equal 1048576', () => {
      expect(power(2, 20)).toBe(1048576);
    });

    test('square root of decimal: √0.25 should equal 0.5', () => {
      expect(squareRoot(0.25)).toBe(0.5);
    });
  });
});
