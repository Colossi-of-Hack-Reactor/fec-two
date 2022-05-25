import React, { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import styled from 'styled-components';
// import Bar from './bar.jsx';

const Star = styled.div`
  align: left;
`;
const Score = styled.div`
  color: DimGray;
  font-size: 70px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
`;

export default function RatingList({ meta }) {
  const starRange = [5, 4, 3, 2, 1];
  console.log(meta);
  let totalScore = 0;
  let totalRating = 0;
  if (Object.keys(meta).length !== 0) {
    for (let key in meta.ratings) {
      totalScore += key * Number(meta.ratings[key]);
      totalRating += Number(meta.ratings[key]);
    }
  }
  let total = (totalScore / totalRating);
  let score = Math.ceil(4 * total) * 0.25;
  let round = total.toFixed(1);

  return (
    <div>
      {
        Object.keys(meta).length !== 0
          ? (
            <div>
              <Score>{round}</Score>
              <StarRatings
                rating={score}
                starDimension="20px"
                starSpacing="5px"
                starRatedColor="DimGray"
                starEmptyColor="Gainsboro"
              />
              <hr />
              {/* <Bar bgcolor="red" progress="60" height={30} /> */}
              <div>
                {starRange.map((range) => (
                  <div>
                    <span>{meta.ratings[range]}</span>
                    <Star>
                      <StarRatings
                        rating={range}
                        starDimension="20px"
                        starSpacing="5px"
                        starRatedColor="DimGray"
                        starEmptyColor="Gainsboro"
                      />
                    </Star>
                  </div>
                ))}
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
