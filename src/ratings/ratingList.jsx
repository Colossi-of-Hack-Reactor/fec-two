import React, { useState, useEffect } from 'react';

export default function RatingList({ meta }) {
  return (
    <div>
      <div>
        {/* <span>{meta.ratings[2]}</span>
        <span>{meta.ratings[3]}</span>
        <span>{meta.ratings[4]}</span>
        <span>{meta.ratings[5]}</span> */}
      </div>
      <div>
        <span>
          {meta.characteristics.Size.value}
        </span>
        <span>
          {meta.characteristics.Width.value}
        </span>
        <span>
          {meta.characteristics.Comfort.value}
        </span>
      </div>
    </div>
  );
}
