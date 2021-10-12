const calculate = require('../../server/calculator/calculate.js').calculate;
const { goodOps, results, badOps} = require('../fixtures/exampleOperations.js').operations;

describe ('example operations', () => {
  it ('solves example operations', () => {
    goodOps.forEach((operation, index) => {
      expect(calculate(operation)).toBe(results[index]);
    });
    badOps.forEach((badOperation) => {
      expect(calculate(badOperation).slice(0, 5)).toBe('Error');
    });
  });
});

describe ('basic operations', () => {
  it ('returns zero if input is absent or falsy', () => {
    expect(calculate()).toBe(0);
    expect(calculate('')).toBe(0);
    expect(calculate('0')).toBe(0);
  });
  it ('handles leading zeros', () => {
    expect(calculate('01')).toBe(1);
    expect(calculate('00000001 + 0000000000000001')).toBe(2);
  });
  it ('solves basic additions', () => {
    expect(calculate('1+2')).toBe(3);
    expect(calculate('2+2')).toBe(4);
    expect(calculate('1+2+3+4')).toBe(10);
  });
  it ('solves basic substractions', () => {
    expect(calculate('1-2')).toBe(-1);
    expect(calculate('2-2')).toBe(0);
    expect(calculate('1-2-3-4')).toBe(-8);
  });
  it ('solves basic multiplications', () => {
    expect(calculate('1*0')).toBe(0);
    expect(calculate('1×2')).toBe(2);
    expect(calculate('1*2*3*4')).toBe(24);
  });
  it ('solves basic divisions', () => {
    expect(calculate('4÷2')).toBe(2);
    expect(calculate('2/2')).toBe(1);
    expect(calculate('0.1/0.2')).toBe(0.5);
  });
});

describe ('order of precedence', () => {
  it ('solves divisions and multiplications before additions and substractions', () => {
    expect(calculate('7+6*5-4/2')).toBe(35);
  });
  it ('solves additions and substractions in the order they appear unless there are parentheses', () => {
    expect(calculate('5-8-22+1')).toBe(-24);
    expect(calculate('5-(8-22)+1')).toBe(20);
  });
});

describe ('parentheses', () => {
  it ('evaluates an opening parenthesis following a number as a multiplication', () => {
    expect(calculate('3.5(4-2)')).toBe(7);
  });
  it ('evaluates a number following a closing parenthesis as a multiplication', () => {
    expect(calculate('(4-2)3.5')).toBe(7);
  });
  it ('handles deeply nested parentheses', () => {
    expect(calculate('((((((1))))))')).toBe(1);
    expect(calculate('2-(3(4+(5-(4/2))-1)/2)+1')).toBe(-6);
  });
});

describe ('floats', () => {
  it ('handles float inconsistencies', () => {
    expect(calculate('0.1+0.2')).toBe(0.3);
    expect(calculate('0.1-0.2')).toBe(-0.1);
    expect(calculate('0.1*0.2')).toBe(0.02);
    expect(calculate('1/2')).toBe(0.5);
  });
  it ('rounds up to the ten millionth', () => {
    expect(calculate('1/2/3/4')).toBe(0.0416666667);
  });
  it ('translates very small numbers to exponents', () => {
    expect(calculate('0.00000000000000000000000000000001')).toBe(1e-32);
  });
});

describe ('large numbers', () => {
  it ('handles numbers up to fifteen digits', () => {
    expect(calculate('999999999999999')).toBe(999999999999999);
  });
  it ('rounds up numbers with 16-20 digits', () => { // next fix
    expect(calculate('99999999999999999')).toBe(100000000000000000);
  });
  it ('translates numbers with at least 21 digits to exponents', () => {
    expect(calculate('999999999999999999999')).toBe(1e21);
  });
  it ('registers huge numbers as infinity', () => { // fix after next
    expect(calculate('9*9*9*9*9*9*9*9*9*9*9*9*9*9*9*9*9*9*9*9*9*9*9*9*9*9*9*9')).toBe(Infinity);
  });
});

describe ('errors', () => {
  let error;
  it ('returns an error if there are too many operators in a row', () => {
    error = 'Error: invalid character';
    expect(calculate('19 + cinnamon')).toBe(error);
  });
  it ('returns an error if operation ends with an operator', () => {
    error = 'Error: operation cannot end with an operator';
    expect(calculate('1+2+3+4+')).toBe(error);
  });
  it ('returns an error if there are more than one decimal point in a number', () => {
    error = 'Error: too many decimal points within a number';
    expect(calculate('1.1.1')).toBe(error);
  });
  it ('returns an error if there is an unaccompanied decimal point', () => {
    error = 'Error: decimal point needs a number on either side';
    expect(calculate('1+.+1')).toBe(error);
  });
  it ('returns an error if an opening parenthesis is followed by an operator (other than minus)', () => {
    error = 'Error: opening parenthesis followed by an operator';
    expect(calculate('(+4-2)*3.5')).toBe(error);
    expect(calculate('(-4-2)*3.5')).toBe(-21);
  });
  it ('returns an error if an operator is followed by a closing parenthesis', () => {
    error = 'Error: operator followed by closing parenthesis';
    expect(calculate('(4-2-)*3.5')).toBe(error);
  });
  it ('returns an error if there are too many operators in a row', () => {
    error = 'Error: too many operators in a row';
    expect(calculate('2+-+-4')).toBe(error);
    expect(calculate('2+---4')).toBe(error);
  });
  it ('returns an error if there is an empty parenthesis', () => {
    error = 'Error: empty parenthesis';
    expect(calculate('(4-2)*3.5+()')).toBe(error);
  });
  it ('returns an error if parentheses are not balanced', () => {
    error = 'Error: parentheses are not balanced';
    expect(calculate('(((1+2)+3)+4')).toBe(error);
    expect(calculate('((1+2)+3)+4)')).toBe(error);
  });
  it ('returns an error if a division sign is followed by zero', () => {
    error = 'Error: cannot divide by 0';
    expect(calculate('1/0')).toBe(error);
    expect(calculate('1/(1-1)')).toBe(error);
  });
  it ('returns an error if the result of a parenthesis is an error', () =>  {
    expect(calculate('(1/0)')).toBe(error);
    expect(calculate('(9/(9-9))')).toBe(error);
  });
});