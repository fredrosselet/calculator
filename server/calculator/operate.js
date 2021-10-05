const findOperands = require('./findOperands.js').findOperands;
const solve = require('./solve.js').solve;

const operate = (operation, ops = [['/', '*'], ['+', '-']]) => {

  // BASE CASE (final number)
  if (!isNaN(operation)) {
    let finalResult = Number(operation);
    // limit the length of floats
    if (!Number.isInteger(finalResult) && operation.length > 10) {
      return Number(finalResult.toPrecision(9));
    }
    return finalResult;
  }

  // PARENTHESIS
  if (operation.indexOf('(') > -1) {
    // find indexes of innermost opening and closing parenthesis
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

    // solve inside of parenthesis
    let innerResult = operate(insideParenthesis, ops).toString();
    // remove parenthesis and insert inner result
    operation = operation.slice(0, openingParIndex) + innerResult + operation.slice(closingParIndex + 1);
    // resume operation
    return operate(operation, [['/', '*'], ['+', '-']]);
  }

  // find next operation to solve
  let j, op, opIndex;
  let precedence = ops[0]; // ('/' & '*') or ('+' & '-')
  // if either of the first pair of operators is found (first number may be negative negative => start at index 1)
  for (j = 1; j < operation.length; j++) {
    if (precedence.includes(operation[j])) {
      op = operation[j];
      opIndex = j;
      break;
    }
  }

  // if neithe '/' or '*' is found in operation, start over with the next order of precedence ('+' and '-')
  if (j === operation.length) {
    ops.shift();
    return operate(operation, ops);
  }

  // parse operands before and after operator
  let before = operation.slice(0, opIndex);
  let after = operation.slice(opIndex + 1);
  let [str1, str2, str1Index] = findOperands(before, after);
  let num1 = Number(str1);
  let num2 = Number(str2);
  if (op === '/' && num2 === 0) {
    return 'Error: cannot divide by 0';
  }

  // calculate result of inner operation
  let result = solve(num1, num2, op).toString();
  // replace inner operation with result
  operation = operation.slice(0, str1Index) + result + after.slice(str2.length);


  // recursive call
  return operate(operation, ops);
};

module.exports.operate = operate;