const findOperands = require('./findOperands.js').findOperands;
const solve = require('./solve.js').solve;

const operate = (operation, ops = ['/', '*', '+', '-']) => {

  // base case:
  if (!isNaN(Number(operation))) {
    let finalResult = Number(operation);
    if (!Number.isInteger(finalResult) && operation.length > 10) {
      return Number(finalResult.toPrecision(8));
    }
    return finalResult;
  }

  // if there is a parenthesis
  let openingParIndex = operation.lastIndexOf('(');
  if (openingParIndex > -1) {
    let closingParIndex = operation.indexOf(')');
    let insideParenthesis = operation.slice(openingParIndex + 1, closingParIndex);
    // solve parenthesis recursively
    let innerResult = operate(insideParenthesis, ops).toString();
    operation = operation.slice(0, openingParIndex) + innerResult + operation.slice(closingParIndex + 1);
    // resume operation
    return operate(operation, ['/', '*', '+', '-']);
  }

  let op = ops[0];
  let opIndex = operation.indexOf(op);
  if (opIndex === -1) {
    // recursive call with first operator removed
    ops.shift();
    return operate(operation, ops);
  }

  let before = operation.slice(0, opIndex);
  let after = operation.slice(opIndex + 1);

  let [str1, str2, str1Index] = findOperands(before, after);

  let num1 = Number(str1);
  let num2 = Number(str2);
  let result = solve(num1, num2, op);

  operation = operation.slice(0, str1Index) + result;
  if (str2) {
    operation += after.slice(str2.length);
  }
  if (!isNaN(result)) {
    result = result.toString();
    operation = operation.slice(0, str1Index) + result + after.slice(str2.length);

  }
  console.log(operation);
  // return operate(operation, ops);
}


// console.log(operate('1*2'));
// console.log(operate('1/1000'))

// console.log(operate('1+2')) // gives 3
// console.log(operate('4*5/2')) // gives 10
// console.log(operate('-5+-8+11*2')) // gives 9
// console.log(operate('-.32/.5')) // gives -0.64
// console.log(operate('(4-2)*3.5')) // gives 7

console.log(operate('-1-3-4'))





module.exports.operate = operate;