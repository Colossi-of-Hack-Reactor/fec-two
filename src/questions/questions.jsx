import React, { useState } from 'react';

export default Questions;

const Questions = function Questions(props) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>
        You clicked questions
        {' '}
        {count}
        {' '}
        times!

      </p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
};
