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
                  {
                    meta.characteristics
                      ? Object.keys(meta.characteristics).map((char, i) => (
                        <div key={i}>
                          <span>{char}</span>
                          {' '}
                          <span>{meta.characteristics[char].value}</span>
                        </div>
                      )) : (null)
                  }
                </div>
                <hr />
              </div>
            ) : (null)
        }
      </div>
  );
}
