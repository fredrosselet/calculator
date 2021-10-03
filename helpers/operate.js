const operators = ['/', '*', '+', '-'];
const { add, sub, mul, div } = require('sinful-math'); // library to handle float inconsistencies

const collectNumbers = (string) => { // helper function: parse string numbers from a string
  string = string.replaceAll('(', '').replaceAll(')', '');
  let numStrs = [];
  let numStr = '';
  for (let i = 0; i < string.length; i++) {

    if (string[i] === '-' && (string[i-1] === undefined || operators.includes(string[i-1]))) { // collect '-' if number is negative
      numStr += '-';
    } else if (operators.includes(string[i])) {
      if (numStr !== '') {
        numStrs.push(numStr);
      }
      numStr = '';
    } else {
      numStr += string[i];
    }
  }
  if (numStr !== '') { // ---- DRY
    numStrs.push(numStr);
  }
  return numStrs;
};

const operate = (operation, numbers = collectNumbers(operation), ops = operators) => {
  // numbers.sort(); // in case we get redundant first digit (ex. [100, 1, 10])
  // console.log(operation, numbers);
  // base case:
  if (!isNaN(Number(operation))) {
    return operation;
  }

  // if there is a parenthesis
  let openingParIndex = operation.lastIndexOf('(');
  if (openingParIndex > -1) {
    let closingParIndex = operation.indexOf(')');
    let insideParenthesis = operation.slice(openingParIndex + 1, closingParIndex);
    let insideNumbers = collectNumbers(insideParenthesis);
    // remove numbers found inside parenthesis from numbers
    numbers = numbers.filter( (num) => !insideNumbers.includes(num) );
    // operate on parenthesis (recursion)
    let innerResult = operate(insideParenthesis, insideNumbers, ops).toString();
    // add parenthesis result to numbers
    numbers.push(innerResult);
    // replace parenthesis with parenthesis result in operation string
    operation = operation.slice(0, openingParIndex) + innerResult + operation.slice(closingParIndex + 1);
    // operate
    return operate(operation, numbers, ['/', '*', '+', '-']);
  }

  let op = ops[0];
  let opIndex = operation.indexOf(op);
  if (opIndex === -1) {
    ops.shift();
    return operate(operation, numbers, ops);
  }

  let before = operation.slice(0, opIndex);
  let after = operation.slice(opIndex + 1);
  let str1Index, str1, str2;
  numbers.forEach((number) => {
    if (before.lastIndexOf(number) > -1) {
      str1Index = before.lastIndexOf(number);
      str1 = number;
    }
    if (after.indexOf(number) === 0) {
      str2 = number;
    }
  });
  let num1 = Number(str1);
  let num2 = Number(str2);
  let result;

  if (op === '/') {
    if (num2 === 0) {
      return 'Error: cannot divide by 0';
    }
    result = (Number.isInteger(num1) && Number.isInteger(num2)) ? (num1 / num2) : (div(num1, num2));
  } else if (op === '*') {
    result = (Number.isInteger(num1) && Number.isInteger(num2)) ? (num1 * num2) : (mul(num1, num2));
  } else if (op === '+') {
    result = (Number.isInteger(num1) && Number.isInteger(num2)) ? (num1 + num2) : (add(num1, num2));
  } else if (op === '-') {
    result = (Number.isInteger(num1) && Number.isInteger(num2)) ? (num1 - num2) : (sub(num1, num2));
  }

  operation = operation.slice(0, str1Index) + result.toString();
  if (str2) {
    operation += after.slice(str2.length);
  }

  numbers = numbers.filter( (num) => ![str1, str2].includes(num) );
  if (!isNaN(result)) {
    numbers.push(result);
  }
  // console.log(operation, numbers, ops);
  return operate(operation, numbers, ops);
}

// console.log(operate(('1-2-3-4')))
// console.log(operate(('1*2')));

module.exports.operate = operate;