import React, { useState } from 'react';

const Inputs = (props)  => {
  const characters = ['(', ')', '÷', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+'];

  const [operation, setOperation] = useState('');

  return (
    <div>
      <div className="operation">{operation ? operation  : '0'}</div>

      <div className="buttonPad">
        <button className="AC" onClick={() => setOperation('')}>{operation ? 'C' : 'AC'}</button>
        {characters.map((character, index) =>
          <button className={character} key={index} onClick={() => setOperation(operation + character)}>{character}</button>
        )}
        <button className="0" onClick={() => operation ? setOperation(operation + '0') : null}>0</button>
        <button className="." onClick={() => operation ? setOperation(operation + '.') : setOperation('0.')}>.</button>
        <button className="=" onClick={() => console.log(operation) /* submit function will go here */}>=</button>
      </div>
    </div>
  );
};

export default Inputs;