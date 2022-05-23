import React, { useState, useEffect } from 'react';
import RatingListEntry from './ratingListEntry.jsx';

export default function RatingList({ reviews }) {
  return (
    <>
      <div>
        {reviews.map((review) => (
          <RatingListEntry
            key={review.id}
            review={review}
          />
        ))}
      </div>
      <div>
        <button type="button"> MORE REVIEWS </button>
        {' '}
        <button type="button"> ADD A REVIEW + </button>
      </div>
    </>
  )
};