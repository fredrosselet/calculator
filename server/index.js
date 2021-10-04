const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

const calculate = require('./calculator/calculate.js').calculate;

app.use(cors());

app.use(express.static('./public'));

app.get('/calculator', (req, res) => {
  let operation = (req.query.operation);
  console.log(operation);
  res.json(calculate(operation));
});

app.listen(port, () => console.log(`server listening at http://localhost:${port}`));