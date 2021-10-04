const calculate = require('../server/calculator/calculate.js').calculate;

describe('example operations', () => {
  const operations = ['1 + 2', '4*5/2', '-5+-8--11*2', '-.32       /.5', '(4-2)*3.5'];
  const results = [3, 10, 9, -0.64, 7];
  const badOperations = ['2+-+-4', '19 + cinnamon'];
  it ('solves example operations', () => {
    operations.forEach((operation, index) => {
      expect(calculate(operation)).toBe(results[index]);
    });
    badOperations.forEach((badOperation) => {
      expect(calculate(badOperation).slice(0, 5)).toBe('Error');
    });
  });
});

describe('basic operations', () => {
  it ('solves basic additions', () => {
    expect(calculate('1+2')).toBe(3);
    expect(calculate('2+2')).toBe(4);
    expect(calculate('0.1+0.2')).toBe(0.3);
    expect(calculate('1+2+3+4')).toBe(10);
  });
  it ('solves basic substractions', () => {
    expect(calculate('1-2')).toBe(-1);
    expect(calculate('2-2')).toBe(0);
    expect(calculate('0.1-0.2')).toBe(-0.1);
    expect(calculate('1-2-3-4')).toBe(-8);
  });
  it ('solves basic multiplications', () => {
    expect(calculate('1*0')).toBe(0);
    expect(calculate('1*2')).toBe(2);
    expect(calculate('2*2')).toBe(4);
    expect(calculate('0.1*0.2')).toBe(0.02);
    expect(calculate('1*2*3*4')).toBe(24);
  });
  it ('solves basic divisions', () => {
    expect(calculate('1/2')).toBe(0.5);
    expect(calculate('2/2')).toBe(1);
    expect(calculate('0.1/0.2')).toBe(0.5);
    expect(calculate('1/2/3/4')).toBe(0.0416666667);
  });
});

// error handling

// more complicated operations