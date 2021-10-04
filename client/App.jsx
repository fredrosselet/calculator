import React, { useState } from 'react';
import Result from './components/Result.jsx';
import Inputs from './components/Inputs.jsx';
import axios from 'axios';

const url = 'localhost';
const port = '3000';

const App = () => {

  const [result, setResult] = useState(0);

  const submitOperation = (operation) => {
    if (operation === '') {
      return 0;
    } else {
      operation = encodeURIComponent(operation); // escapes all characters except A-Z a-z 0-9 - _ . ! ~ * ' ( )
    }
    axios.get(`http://${url}:${port}/calculator?operation=${operation}`)
      .then((response) => setResult(response.data));
  };

  const clear = () => {
    setResult(0);
  }

  return (
    <div className="calculator">
      <Result result={result}/>
      <Inputs submit={submitOperation} clear={clear}/>
    </div>
  );
};



export default App;