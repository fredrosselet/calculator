const { goodOps, results} = require('../fixtures/exampleOperations.js').operations;
const axios = require('axios');
const regeneratorRuntime = require('regenerator-runtime');
const url = 'localhost:3000';

describe ('GET route', () => {
  it ('gets the result of the operation through query parameters', () => {
    goodOps.forEach((op, index) => {
      op = encodeURIComponent(op);
      axios.get(`http://${url}/calculator?operation=${op}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.data).toBe(results[index]);
        })
        .catch(error => console.log(error));
    });
  });
});

describe ('POST route', () => {
  it ('gets the result of the operation through JSON data', () => {
    goodOps.forEach((op, index) => {
      op = JSON.stringify(op);
      axios.post(`http://${url}/calculator`, op)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.data).toBe(results[index]);
        })
        .catch(error => console.log(error));
    });
  });
});