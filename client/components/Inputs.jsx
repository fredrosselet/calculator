import React, { useState } from 'react';

const Inputs = (props)  => {
  const characters = ['(', ')', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+'];

  const [operation, setOperation] = useState('');

  return (
    <div className="inputs">
      <div className="operation">{operation ? operation  : '0'}</div>

      <div className="buttonPad">
        <button className="AC" onClick={
          operation ?
          () => setOperation('') :
          () => props.clear()
        }>
          {operation ? 'C' : 'AC'}
        </button>
        {characters.map((character, index) =>
          <button className={character} key={index} onClick={() => setOperation(operation + character)}>{character}</button>
        )}
        <button className="0" onClick={() => setOperation(operation + '0')}>0</button>
        <button className="." onClick={() => operation ? setOperation(operation + '.') : setOperation('0.')}>.</button>
        <button className="=" onClick={() => props.submit(operation)}>=</button>
      </div>
    </div>
  );
};

export default Inputs;