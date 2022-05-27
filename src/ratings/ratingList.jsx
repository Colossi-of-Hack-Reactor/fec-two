import React, { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import styled from 'styled-components';
import Bar from './bar.jsx';
import ArrowDown from './triangle.jsx'

const Score = styled.div`
  color: DimGray;
  font-size: 70px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
`;

const Container = styled.div`
display: grid;
grid-template-columns: 15% 85%;
align-items: center;
`;

const Box = styled.label`
text-decoration: underline;
&:hover {
  color: tomato;
}
`;

const CharsContainer = styled.div`
  display: grid;
  // grid-template-rows: 80px 80px 80px;
  width: 100%;
  padding-top: 30px;
  gap: 20px;
`;

const Chars = styled.div`
display: grid;
  grid-template-rows: 30px 20px 20px;
`;

const Char = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
font-size: 15px;
`;

export default function RatingList({ meta, handleFilterRating }) {
  const starRange = [5, 4, 3, 2, 1];
  const chars = {
    Size: ['Too small', 'Perfect', 'Too wide'],
    Width: ['Too narrow', 'Perfect', 'Too wide'],
    Comfort: ['Uncomfortable', 'Ok', 'Perfect'],
    Quality: ['Poor', 'Perfect'],
    Length: ['Runs Short', 'Perfect', 'Runs long'],
    Fit: ['Runs tight', 'Perfect', 'Runs long'],
  };

  let totalScore = 0;
  let totalRating = 0;
  let recommend = 100;
  if (Object.keys(meta).length !== 0) {
    for (const key in meta.ratings) {
      totalScore += key * Number(meta.ratings[key]);
      totalRating += Number(meta.ratings[key]);
      recommend = Number(meta.recommended.true) / (Number(meta.recommended.true) + Number(meta.recommended.false)) * 100;
    }
  }
  const total = (totalScore / totalRating);
  const score = Math.ceil(4 * total) * 0.25;
  const round = total.toFixed(1);
  recommend = recommend.toFixed(0);

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
              <h4>{recommend}% of reviews recommend this product</h4>
              {starRange.map((rating, i) => (
                <Container key={i} onClick={() => handleFilterRating(rating)}>
                  <Box>{rating} star</Box>
                  <Bar progress={meta.ratings[rating] / totalRating * 100} />
                </Container>
              ))}
              <div>
                <CharsContainer>
                  {
                    meta.characteristics
                      ? Object.keys(meta.characteristics).map((char, i) => (
                        <Chars key={i}>
                          <span>{char}</span>
                          <ArrowDown
                            percentage={((meta.characteristics[char].value / 5) * 100).toFixed(0)}
                          />
                          <Char>
                            {chars[char].map((elem, i) => (<span key={i}>{elem}</span>))}
                          </Char>
                        </Chars>
                      )) : (null)
                  }
                </CharsContainer>
              </div>
            </div>
          ) : (null)
      }
    </div>
  );
}
