import React, { useState, useEffect } from 'react';
import ReviewListEntry from './reviewListEntry.jsx';

export default function ReviewList({ reviews }) {
  const [more, setMore] = useState('false');
  const [add, setAdd] = useState('false');

  return (
    <div>
      <div>
        {reviews.map((review) => (
          <ReviewListEntry
            key={review.review_id}
            review={review}
          />
        ))}
      </div>
      <div>
        <button type="button" onClick={() => setMore('true')}> MORE REVIEWS </button>
        {' '}
        <button type="button" onClick={() => setAdd('true')}> ADD A REVIEW + </button>
      </div>
    </div>
  );
}
