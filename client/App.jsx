import React, { useState, useRef } from 'react';
import Result from './components/Result.jsx';
import Inputs from './components/Inputs.jsx';
import axios from 'axios';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

const App = () => {

  const [result, setResult] = useState(0);

  const submitOperation = (operation) => {
    if (operation === '') {
      return 0;
    } else {
      operation = encodeURIComponent(operation); // escapes all characters except A-Z a-z 0-9 - _ . ! ~ * ' ( )
    }
    axios.get(`http://${host}:${port}/calculator?operation=${operation}`)
      .then((response) => setResult(response.data));
  };

  const clearAll = () => {
    setResult(0);
  }

  const textareaRef = useRef();

  const focusTextarea = () => { // keeps the textarea focused if clicking anywhere on calculator
    if (window.screen.availWidth > 425) { // ...only on screens wider than 425px
      textareaRef.current.focus();
    }
  };

  return (
    <div className="calculator" onClick={focusTextarea}>
      <Result result={result}/>
      <Inputs submit={submitOperation} clearAll={clearAll} textareaRef={textareaRef}/>
    </div>
  );
};



export default App;