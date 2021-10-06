const format = require('./format.js').format;
const operate = require('./operate.js').operate;

const calculate = (input) => {
  const formatted = format(input);
  if (formatted[0] === 'E') { // return if syntax error happens at formatting level
    return formatted;
  }
  const result = operate(formatted);
  console.log(result); // if using the command line
  return result;
}

module.exports.calculate = calculate;