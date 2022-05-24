import React, { useState, useEffect } from 'react';

export default function RatingList({ meta }) {
  return (
    <div>
      {
        Object.keys(meta).length !== 0
          ? (
            <div>
              <hr />
              <div>
                <span>{meta.ratings[1]}</span>
                <span>{meta.ratings[2]}</span>
                <span>{meta.ratings[3]}</span>
                <span>{meta.ratings[4]}</span>
                <span>{meta.ratings[5]}</span>
              </div>
              <hr />
              <div>
                <span>
                  {meta.characteristics.Comfort.value}
                </span>
                <span>
                  {meta.characteristics.Fit.value}
                </span>
                <span>
                  {meta.characteristics.Length.value}
                </span>
                <span>
                  {meta.characteristics.Quality.value}
                </span>
              </div>
              <hr />
            </div>
          ) : (null)
      }
    </div>
  );
}
