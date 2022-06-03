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
    color: rgb(230, 67, 47);
    cursor: pointer;
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

const Span = styled.span`
  font-size: 15px;
  font-family: Arial, Helvetica, sans-serif;
`;

const ClearTag = styled.div`
  padding: 5px 7px;
  background-color: black;
  color: white;
  font-size: 14px;
  font-family: Arial, Helvetica Neue Thin, sans-serif;
  border: none;
  box-shadow: 0px 0px 3px 3px rgba(0,0,0, .2);
  border-radius: 2px;
  margin: 20px 0;
    &:hover {
      background-color: rgb(230, 67, 47);
      color: white;
      cursor: pointer;
    }
`;

const FilterTag = styled.div`
  padding: 5px 7px;
  background-color: black;
  color: white;
  font-size: 14px;
  font-family: Arial, Helvetica Neue Thin, sans-serif;
  border: none;
  box-shadow: 0px 0px 3px 3px rgba(0,0,0, .2);
  margin: 20px 0;
  border-radius: 2px;
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px
`;

export default function RatingList({ meta, handleFilterRating, filter, setFilter }) {
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
    <div data-testid="ratingList">
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
              <h5>{recommend}% of reviews recommend this product</h5>
              {Object.keys(filter).length ? (
                <TagContainer>
                  {Object.keys(filter).map((val, i) =>
                    <FilterTag key={i}>{val}{' '}star</FilterTag>)}
                  <ClearTag>
                    <label onClick={() => setFilter({})}>clear filter</label>
                  </ClearTag>
                </TagContainer>
              ) : null}
              {starRange.map((rating, i) => (
                <div key={i}>
                  <Container onClick={() => handleFilterRating(rating)} data-testid="filterRating">
                    <label>
                      <Box>{rating} star</Box>
                    </label>
                    <Bar progress={meta.ratings[rating] / totalRating * 100} />
                  </Container>
                </div>
              ))}
              <div>
                <CharsContainer>
                  {
                    meta.characteristics
                      ? Object.keys(meta.characteristics).map((char, i) => (
                        <Chars key={i}>
                          <Span>{char}</Span>
                          <ArrowDown
                            percentage={((meta.characteristics[char].value / 5) * 100).toFixed(0)}
                          />
                          <Char>
                            {chars[char].map((elem, i) => <span key={i}>{elem}</span>)}
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
