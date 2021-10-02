// const parseNumber = (s) => {
//   // allow it to be negative
//   let decimalPointCounted = false;
//   let numberStr = '';

//   for (let i = 0; i < s.length; i++) {
//     if (s[i] === '.') {
//       if (!s[i + 1] || isNaN(s[i + 1])) {
//         return 'Error: missing number after decimal point'
//       } else if (decimalPointCounted) {
//         return 'Error: too many decimal points in one float'
//       } else {
//         decimalPointCounted = true;
//       }
//     }
//     if (s[i] !== '.' && isNaN(s[i])) {
//       return numberStr;
//     } else {
//       numberStr += s[i];
//     }
//   }
//   return numberStr;
// };

const format = (input) => {
  if (!input) {
    return '';
  }

  input = input.trim().replaceAll('x', '*').replaceAll('÷', '/');

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
        operation = operation.slice(0, lastChar) + '+';
      } else {
        operation += '-';
      }
    }

    // PARENTHESES
    if (firstChar === '(') {
      unresolvedParentheses++;
      // add * in front of ( if previous character is a number
      if (!isNaN(lastChar)) {
        operation += '*';
      }
      operation += '(';
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

    // NUMBERS


    return recursiveParse(string.slice(1), operation);
  }


  const result = recursiveParse(input);

  // check if parentheses there are leftover opening parentheses
  if (unresolvedParentheses > 0) {
    return 'Error: too many opening parentheses';
  } else {
    return result;
  }
};