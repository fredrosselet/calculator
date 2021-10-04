// find operands on each side of an operator (as well as index of single operation)
module.exports.findOperands = (string1, string2) => {
  const operators = ['*', '/', '+', '-'];

  // OPERAND 1
  // iterate backwards over string1
  let i = string1.length - 1;
  while (i >= 0 &&
    !isNaN(string1[i]) ||
    string1[i] === '.' || // accept decimal point
    (string1[i] === '-' && (operators.includes(string1[i - 1]) || string1[i - 1] === undefined))
    // only accept minus sign if it is preceded by an operator (or nothing), i. e. if "-" is a sign and not an  operator
  ){
    i--;
  }
  let operationIndex = i + 1; // save index of where the first operand starts
  let operand1 = string1.slice(operationIndex);

  // OPERAND 2
  // iterate forwards over string2
  let j = (string2[0] === '-') ? 1 : 0; // skip first character if second operand is negative
  while (j < string2.length &&
    !isNaN(string2[j]) ||
    string2[j] === '.' // accept decimal point
  ){
    j++;
  }
  let operand2 = string2.slice(0, j);
  return [operand1, operand2, operationIndex];
};