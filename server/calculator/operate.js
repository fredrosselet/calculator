const findOperands = require('./findOperands.js').findOperands;
const solve = require('./solve.js').solve;

const operate = (operation, ops = [['/', '*'], ['+', '-']]) => { // '-1-3-4'

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
    return operate(operation, [['/', '*'], ['+', '-']]);
  }

  let j, op, opIndex;
  let precedence = ops[0]; // (/ & *) or (+ & -)

  // if either of the first pair of operators is found (start from index 1 in case first number is negative)
  for (j = 1; j < operation.length; j++) {
    if (precedence.includes(operation[j])) {
      op = operation[j];
      opIndex = j;
      break;
    }
  }


  // if current operator is not found in operation, start over with the next order of precedence (+ or -)
  if (j === operation.length) {
    ops.shift();
    return operate(operation, ops);
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

module.exports.operate = operate;