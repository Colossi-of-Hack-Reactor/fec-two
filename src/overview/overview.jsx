import React, { useState } from 'react';

function Overview() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button type="button" onClick={() => { setCount(count + 1); }}>
        Click to increase OVERVIEW.
      </button>
      <p>
        Overview:
        {count}
      </p>
    </>
  );
}

export default Overview;
