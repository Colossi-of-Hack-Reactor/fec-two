import React, { useState, useEffect } from 'react';

function Related() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked related ${count} times`;
  });
  return (
    <div>
      <p>
        You clicked RELATED
        {' '}
        {count}
        {' '}
        times
      </p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Related;
