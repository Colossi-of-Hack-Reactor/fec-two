import React, { useState, useEffect } from 'react';

function Ratings() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = 'Done';
  });

  return (
    <div>
      <p>
        You clicked
        {count}
        times
      </p>
      <button type="submit" onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Ratings;
