const { add, sub, mul, div } = require('sinful-math'); // library to handle float inconsistencies

module.exports.solve = (num1, num2, op) => {
  if (op === '/') {
    return (Number.isInteger(num1) && Number.isInteger(num2)) ? (num1 / num2) : (div(num1, num2));
  }
  if (op === '*') {
    return (Number.isInteger(num1) && Number.isInteger(num2)) ? (num1 * num2) : (mul(num1, num2));
  }
  if (op === '+') {
    return (Number.isInteger(num1) && Number.isInteger(num2)) ? (num1 + num2) : (add(num1, num2));
  }
  if (op === '-') {
    return (Number.isInteger(num1) && Number.isInteger(num2)) ? (num1 - num2) : (sub(num1, num2));
  }
};