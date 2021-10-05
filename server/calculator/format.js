// format string before solving operation
const format = (input) => {
  if (!input) {
    return '0';
  }

  // initial formatting
  input = input.replaceAll(' ', '').replaceAll('×', '*').replaceAll('÷', '/');

  const calcChars = ['(', ')', '.', '+', '-', '*', '/', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const operators = ['+', '-', '*', '/'];

  if (operators.includes(input[input.length - 1])) {
    return 'Error: operation cannot end with an operator';
  }

  let unresolvedParentheses = 0; // keep track of how many parentheses are open. This should be 0 by the end of the formatting (l. 127)

  const recursiveFormat = (string, operation = '') => {
    let firstChar = string[0];
    let nextChar = string[1];
    let lastChar = operation[operation.length - 1];

    // BASE CASE
    if (string.length === 0) {
      return operation;
    }

    // only accept calcChars
    if (!calcChars.includes(firstChar)) {
      return 'Error: invalid character';
    }

    // --- NUMBERS (including decimal point) ---
    if (!isNaN(firstChar) || firstChar === '.') {
      let numberStr = '';
      let decimalPointCounted = false; // only allow one decimal point per number
      let i = 0;
      while (i < string.length && (!isNaN(string[i]) || string[i] === '.')) {
        if (string[i] === '.') {
          if (decimalPointCounted) {
            return 'Error: too many decimal points within a number';
          } else {
            decimalPointCounted = true;
          }
        }
        numberStr += string[i];
        i++;
      }

      if (numberStr === '.') { // if the number only consists of a decimal point (there needs to be at least a number before or after)
        return 'Error: decimal point needs a number on either side';
      }

      // recursive call for numbers (incl. floats)
      return recursiveFormat(string.slice(numberStr.length), operation + numberStr);
    }


    // --- NON NUMBER ---
    else {

      // OPERATORS
      if (firstChar === '+' || firstChar === '*' || firstChar === '/') {
        if (lastChar === '(') {
          return 'Error: opening parenthesis followed by an operator';
        }

        if (operators.includes(lastChar)) {
          return 'Error: too many operators in a row';
        } else if (firstChar === '+' && nextChar === '-') { // +- => -
          operation += '-';
          string = string.slice(1);
        } else {
          operation += firstChar;
        }
      }
      if (firstChar === '-') {
        if (
          (operators.includes(lastChar) && operators.includes(nextChar)) ||
          (nextChar === '-' && lastChar === undefined)
          ) {
          return 'Error: too many operators in a row';
        } else if (nextChar === '-') { // -- => +
          operation += '+';
          string = string.slice(1);
        } else {
          operation += '-';
        }
      }

      // PARENTHESES
      if (firstChar === '(') {
        if (nextChar === ')') {
          return 'Error: empty parenthesis';
        }
        unresolvedParentheses++;
        // add * in front of ( if previous character is a number or .
        if (!isNaN(lastChar) || lastChar === '.') {
          operation += '*';
        }
        operation += '(';
      }
      if (firstChar === ')') {
        if (operators.includes(lastChar)) {
          return 'Error: operator followed by closing parenthesis';
        }
        if (unresolvedParentheses > 0) {
          unresolvedParentheses--;
          operation += ')';
          // add * after ) if next character is a number or .
          if (!isNaN(nextChar) || nextChar === '.') {
            operation += '*';
          }
        } else {
          return 'Error: parentheses are not balanced';
        }
      }

      // recursive call for non-numbers
      return recursiveFormat(string.slice(1), operation);
    }
  };

  // start the recursive function
  const formattedOperation = recursiveFormat(input);

  // lastly...
  // return if error
  if (formattedOperation[0] === 'E') {
    return formattedOperation;

  // check if parentheses there are leftover opening parentheses
  } else if (unresolvedParentheses > 0) {
    return 'Error: parentheses are not balanced';

  // otherwise return result operation
  } else {
    return formattedOperation;
  }
};

module.exports.format = format;