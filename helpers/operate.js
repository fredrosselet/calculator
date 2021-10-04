const operators = ['/', '*', '+', '-'];
const findOperands = require('./findOperands.js').findOperands;
const { add, sub, mul, div } = require('sinful-math'); // library to handle float inconsistencies

// const collectNumbers = (string) => { // helper function: parse string numbers from a string
//   string = string.replaceAll('(', '').replaceAll(')', '');
//   let numStrs = [];
//   let numStr = '';
//   for (let i = 0; i < string.length; i++) {

//     if (string[i] === '-' && (string[i-1] === undefined || operators.includes(string[i-1]))) { // collect '-' if number is negative
//       numStr += '-';
//     } else if (operators.includes(string[i])) {
//       if (numStr !== '') {
//         numStrs.push(numStr);
//       }
//       numStr = '';
//     } else {
//       numStr += string[i];
//     }
//   }
//   if (numStr !== '') { // ---- DRY
//     numStrs.push(numStr);
//   }
//   return numStrs;
// };

const operate = (operation, /*numbers = collectNumbers(operation),*/ ops = operators) => {
  // numbers.sort(); // in case we get redundant first digit (ex. [100, 1, 10]) ---FIND BETTER SOLUTION
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
    // let insideNumbers = collectNumbers(insideParenthesis);
    // remove numbers found inside parenthesis from numbers
    // numbers = numbers.filter( (num) => !insideNumbers.includes(num) );
    // operate on parenthesis (recursion)
    let innerResult = operate(insideParenthesis, /* insideNumbers, */ ops).toString();
    // add parenthesis result to numbers
    // numbers.push(innerResult);
    // replace parenthesis with parenthesis result in operation string
    operation = operation.slice(0, openingParIndex) + innerResult + operation.slice(closingParIndex + 1);
    // operate
    return operate(operation, /*numbers,*/ ['/', '*', '+', '-']);
  }

  let op = ops[0];
  let opIndex = operation.indexOf(op);
  if (opIndex === -1) {
    ops.shift();
    return operate(operation, /*numbers,*/ ops);
  }

  let before = operation.slice(0, opIndex);
  let after = operation.slice(opIndex + 1);

  let [str1, str2, str1Index] = findOperands(before, after);

  let num1 = Number(str1);
  let num2 = Number(str2);
  // console.log(num1, num2);
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

  operation = operation.slice(0, str1Index) + result;
  if (str2) {
    operation += after.slice(str2.length);
  }

  // numbers = numbers.filter( (num) => ![str1, str2].includes(num) );

  if (!isNaN(result)) {
    result = result.toString();
    // numbers.push(result);
    operation = operation.slice(0, str1Index) + result + after.slice(str2.length);
    // if (str2) {
    //   operation += after.slice(str2.length);
    // }
  }
  // console.log(operation);
  // return operate(operation, /*numbers,*/ ops);
}


// console.log(operate(('1*2')));
// console.log(operate('1/1000'))

// console.log(operate('1+2')) // gives 3
// console.log(operate('4*5/2')) // gives 10
// console.log(operate('-5+-8+11*2')) // gives 9
// console.log(operate('-.32/.5')) // gives -0.64
// console.log(operate('(4-2)*3.5')) // gives 7

// console.log(operate(('1-2-3-4')))





module.exports.operate = operate;