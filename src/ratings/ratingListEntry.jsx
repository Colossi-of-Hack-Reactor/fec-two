import React, { useState, useEffect } from 'react';

export default function RatingListEntry({review}) {
  const [yes, setYes] = useState(0);

  return (
    <div>
      <label>star</label>
      <label>star</label>
      <label>title</label>
      <p>{review}</p>
      <label onClick={() => setYes(yes + 1)}>Yes</label>
      <label>Report</label>
    </div>
  )
};