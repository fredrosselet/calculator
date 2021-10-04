const findOperands = require('./findOperands.js').findOperands;
const solve = require('./solve.js').solve;

const operate = (operation, ops = ['/', '*', '+', '-']) => { // '-1-3-4'

  // base case:
  if (!isNaN(Number(operation))) {
    let finalResult = Number(operation);
    if (!Number.isInteger(finalResult) && operation.length > 10) {
      return Number(finalResult.toPrecision(9));
    }
    return finalResult;
  }

  // if there is a parenthesis
  if (operation.indexOf('(') > -1) { // (4*5)/((2*3)--1)
    let openingParIndex = operation.indexOf('(');
    let i = 0;
    while (i < operation.length && operation[i] !== ')') {
      if (operation[i] === '(') {
        openingParIndex = i;
      }
      i++;
    }
    let closingParIndex = i;
    let insideParenthesis = operation.slice(openingParIndex + 1, closingParIndex);
    // solve parenthesis recursively
    let innerResult = operate(insideParenthesis, ops).toString();
    operation = operation.slice(0, openingParIndex) + innerResult + operation.slice(closingParIndex + 1);
    // resume operation
    return operate(operation, ['/', '*', '+', '-']);
  }

  let op = ops[0];
  let opIndex = operation.indexOf(op);

  // if current operator is not found in operation, start over with current operator removed
  if (opIndex === -1) {
    ops.shift();
    return operate(operation, ops);
  } else if (opIndex === 0) { // if operation begins with a negative number
    opIndex = operation.indexOf(op, 1);
  }
  let before = operation.slice(0, opIndex);
  let after = operation.slice(opIndex + 1);

  let [str1, str2, str1Index] = findOperands(before, after);
  let num1 = Number(str1);
  let num2 = Number(str2);


  if (op === '/' && num2 === 0) {
    return 'Error: cannot divide by 0';
  }

  let result = solve(num1, num2, op);

  operation = operation.slice(0, str1Index) + result;
  if (str2) {
    operation += after.slice(str2.length);
  }
  if (!isNaN(result)) {
    result = result.toString();
    operation = operation.slice(0, str1Index) + result + after.slice(str2.length);
  }
  return operate(operation, ops);
};

console.log(operate('1+1-2+9'));

module.exports.operate = operate;