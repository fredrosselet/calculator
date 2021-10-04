const format = require('./helpers/format.js').format;
const operate = require('./helpers/operate.js').operate;

export const calculate = (input) => {
  const formatted = format(input);
  if (formatted[0] === 'E') { // return if syntax error happens at formatting level
    return formatted;
  }
  return operate(formatted);
}