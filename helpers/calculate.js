const calculate = (operation, numbers) => {
  // base case:
  // console.log(Number(operation));
  if (!isNaN(Number(operation))) {
    return operation;
  }

  // if there is an opening parenthesis
    // find the last closing parenthesis
    // apply calculate on the string between those parentheses (excludind parens)
    // remove parenthesis

  // if there is a division sign in operation
    // cross-reference the two numbers in question between operation and numbers array
    // save index of first number in operation
    // Number(the numbers)
    // RETURN ERROR IF 0 FOLLOWS /
    // solve division (make a case for /-), save result
    // remove / (or /-) and two adjacent numbers from operation and array
    // reinsert stringified result in operation at saved index and in array

  // same with multiplications
  // same with additions
  let plusIndex = operation.indexOf('+');
  if (plusIndex > -1) {
    let before = operation.slice(0, plusIndex);
    let after = operation.slice(plusIndex + 1);
    let index, str1, str2;
    numbers.forEach((number) => {
      if (before.lastIndexOf(number) > -1) {
        index = before.lastIndexOf(number);
        str1 = number;
      }
      if (after.indexOf(number) === 0) {
        str2 = number;
      }
    });
    let num1 = Number(str1);
    let num2 = Number(str2);
    let result = (num1 + num2).toString();
    operation = operation.slice(0, index) + result + after.slice(str2.length);
    numbers.splice(numbers.indexOf(str1), 1);
    numbers.splice(numbers.indexOf(str2), 1);
    numbers.push(result);
  }

  // same with substractions


  // make recursive call with shorter operation and shorter array
  // console.log(operation, numbers)
  return calculate(operation, numbers);


}

console.log(calculate('1000+0.22+3.56+-9000000', ['1000', '0.22', '3.56', '-9000000']))