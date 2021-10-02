const format = (input) => {
  if (!input) {
    return '0';
  }

  input = input.replaceAll(' ', '').replaceAll('x', '*').replaceAll('÷', '/');

  const calcChars = ['(', ')', '.', '+', '-', '*', '/', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const operators = ['+', '-', '*', '/'];

  let unresolvedParentheses = 0;

  const recursiveParse = (string, operation = '') => {
    let firstChar = string[0];
    let nextChar = string[1];
    let lastChar = operation[operation.length - 1];

    // base case
    if (string.length === 0) {
      return operation;
    }

    // only accept calcChars
    if (!calcChars.includes(firstChar)) {
      return 'Error: invalid input';
    }

    // NUMBERS OR DECIMAL POINT
    if (!isNaN(firstChar) || firstChar === '.') {
      let numberStr = '';
      let decimalPointCounted = false;
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

      if (numberStr === '.') {
        return 'Error: decimal point needs a number on either side';
      }

      // recursive call for numbers (incl. floats)
      return recursiveParse(string.slice(numberStr.length), operation + numberStr);
    }


    // NOT A NUMBER
    else {
      // OPERATORS
      if (firstChar === '+' || firstChar === '*' || firstChar === '/') {
        if (operators.includes(lastChar)) {
          return 'Error: too many operators in a row';
        } else {
          operation += firstChar;
        }
      }
      if (firstChar === '-') {
        if (operators.includes(lastChar) && operators.includes(nextChar)) {
          return 'Error: too many operators in a row';
        }
        if (lastChar === '-') {
          operation = operation.slice(0, lastChar);
          operation += '+';
        } else {
          operation += '-';
        }
      }

      // PARENTHESES
      if (firstChar === '(') {
        if (nextChar === ')') {
          return 'Error: empty parenthesis';
        } else {
          unresolvedParentheses++;
          // add * in front of ( if previous character is a number
          if (!isNaN(lastChar)) {
            operation += '*';
          }
          operation += '(';
        }
      }
      if (firstChar === ')') {
        if (unresolvedParentheses > 0) {
          unresolvedParentheses--;
          operation += ')';
          // add * after ) if next character is a number or .
          if (!isNaN(nextChar) || nextChar === '.') {
            operation += '*';
          }
        } else {
          return 'Error: too many closing parentheses';
        }
      }

      // recursive call for non-numbers
      return recursiveParse(string.slice(1), operation);
    }
  };

  const result = recursiveParse(input);

  // unless we already have an error
  if (result[0] === 'E') {
    return result;

  // check if parentheses there are leftover opening parentheses
  } else if (unresolvedParentheses > 0) {
    return 'Error: too many opening parentheses';

  // otherwise return result operation
  } else {
    return result;
  }
};