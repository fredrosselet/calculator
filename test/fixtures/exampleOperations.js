const goodOps = ['1 + 2', '4*5/2', '-5+-8--11*2', '-.32       /.5', '(4-2)*3.5'];
const results = [3, 10, 9, -0.64, 7];
const badOps = ['2+-+-4', '19 + cinnamon'];

module.exports.operations = { goodOps, results, badOps };