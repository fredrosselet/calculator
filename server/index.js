const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const shrinkRay = require('shrink-ray-current');

const calculate = require('./calculator/calculate.js').calculate;

app.use(cors());
app.use(bodyParser.json());
app.use(shrinkRay());
app.use(express.static('./public'));

app.get('/calculator', (req, res) => {
  let operation = req.query.operation;
  res.json(calculate(operation));
});

app.post('/calculator', (req, res) => {
  let operation = req.body.operation;
  res.json(calculate(operation));
});

app.listen(port, () => console.log(`server listening at http://localhost:${port}`));