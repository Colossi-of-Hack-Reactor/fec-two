import React, { useState, useEffect } from 'react';

export default function ReviewListEntry({ review }) {
  const [yes, setYes] = useState(0);

  return (
    <div>
      <div>
        <label>star</label>
        <small>
          {review.date}
          {' '}
          {review.reviewer_name}
        </small>
      </div>
      <div>
        <h3>{review.summary}</h3>
        <p>{review.body}</p>
      </div>
      <div>
        <small>
          Helpful?
          {' '}
          <p onClick={() => setYes(yes + 1)}>Yes</p>
          {' '}
          ({yes})
          {' | '}
          Report
        </small>
      </div>
      <hr />
    </div>
  );
}
