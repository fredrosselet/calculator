import React from 'react';

const Result = (props) => {
  let result = props.result;
  if (result[0] === 'E') {
    alert(result);
    result = 'Error';
  }
  return (
    <div className="result">{result}</div>
  );
};

export default Result;