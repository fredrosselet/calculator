const { add, sub, mul, div } = require('sinful-math'); // library to handle float inconsistencies

module.exports.solve = (num1, num2, operator) => {
  if (operator === '/') {
    if (num2 === 0) {
      return 'Error: cannot divide by 0';
    }
    return (Number.isInteger(num1) && Number.isInteger(num2)) ? (num1 / num2) : (div(num1, num2));
  } else if (operator === '*') {
    return (Number.isInteger(num1) && Number.isInteger(num2)) ? (num1 * num2) : (mul(num1, num2));
  } else if (operator === '+') {
    return (Number.isInteger(num1) && Number.isInteger(num2)) ? (num1 + num2) : (add(num1, num2));
  } else if (operator === '-') {
    return (Number.isInteger(num1) && Number.isInteger(num2)) ? (num1 - num2) : (sub(num1, num2));
  }
}