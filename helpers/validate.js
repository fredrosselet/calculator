const validate = (string) => {

  let chars = string.trim().split('');
  console.log(chars);

  const calcChars = ['(', ')', '.', '+', '-', 'x', '*', '÷', '/', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  let unresolvedParentheses = 0;

  for (let i = 0; i < chars.length; i++) {
    // remove inner spaces
    if (chars[i] === ' ') {
      chars.splice(i, 1);
      i--;
    }

    // only accept characters from the calculator
    if (!calcChars.includes(chars[i])) {
      return 'Invalid input';
    }

    // replace 'x' with '*' and '÷' with '/'
    if (chars[i] === 'x') {
      chars[i] = '*';
    }
    if (chars[i] === '÷') {
      chars[i] = '/';
    }

    // check if parentheses are balanced (closing bracket occurring too soon)
    if (chars[i] === '(') {
      unresolvedParentheses++;
      // add * in front of ( if previous character is a number
      if (!isNaN(chars[i - 1])) {
        chars.splice(i, 0, '*');
        i++;
      }
    }
    if (chars[i] === ')') {
      if (unresolvedParentheses > 0) {
        unresolvedParentheses--;
        // add * after )if next character is a number or .
        if (!isNaN(chars[i + 1]) || chars[i + 1] === '.') {
          chars.splice(i + 1, 0, '*');
          i++;
        }
      } else {
        return 'Too many closing parentheses';
      }
    }
  }

  // check if parentheses are balanced after loop (leftover opening parentheses)
  if (unresolvedParentheses > 0) {
    return 'Too many opening parentheses';
  }


  // parse numbers
    // only allow one . per number

  // check if it divides by 0

  // no more than 2 operators in a row
    // if there are 2 operators in a row
      // if the second one is -
        // if the first one is also -
          // turn them into a plus
  return chars.join('');
};