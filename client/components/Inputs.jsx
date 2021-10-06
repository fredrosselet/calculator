import React, { useState } from 'react';
import { findDOMNode } from 'react-dom';

const Inputs = (props)  => {
  const characters = ['(', ')', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0'];

  const [operation, setOperation] = useState('');

  const handleChange = (e) => {
    setOperation(e.target.value);
  }

  const handleKeyPress = (e) => {
    const moreKeys = ['.', 'Backspace', 'Delete', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']; // allow typing of backspace and arrows keys
    let key = e.key;
    if (!characters.includes(key) && !moreKeys.includes(key)) { // prevents any other characters from being typed
      e.preventDefault();
      if (key === 'Enter' || key === '=') {
        props.submit(operation);
      }
    }
  }

  return (
    <div className="inputs" onKeyDown={handleKeyPress}>
      <textarea className="operation" ref={props.textareaRef} autoFocus value={operation} onChange={handleChange}></textarea>
      <div className="buttonPad">
        <button className="AC" onClick={operation ? () => setOperation('') : () => props.clearAll()}>{operation ? 'C' : 'AC'}</button>
        {characters.map((character, index) =>
          <button className={character} key={index} onClick={() => setOperation(operation + character)}>{character}</button>
        )}
        <button className="." onClick={() => operation ? setOperation(operation + '.') : setOperation('0.')}>.</button>
        <button className="=" onClick={() => props.submit(operation)}>=</button>
      </div>
    </div>
  );
};

export default Inputs;