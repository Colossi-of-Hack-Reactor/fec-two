import React, { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import styled from "styled-components";

const Time = styled.div`
  padding-top: 5px;
  font-size: 14px;
  font-weight: 100;
  position: absolute;
  right: 60px;
`;

const Yes = styled.div`
  text-decoration: underline;
`;

export default function ReviewListEntry({ review, filter }) {
  const [yes, setYes] = useState(0);
  console.log(filter);
  // console.log(review.rating);

  return (
    <div>
      {filter[review.rating] !== undefined || Object.keys(filter).length === 0 ? (
        <>
          <div>
            <div>
              <StarRatings
                rating={review.rating}
                starDimension="15px"
                starSpacing="2px"
                starRatedColor="DimGray"
                starEmptyColor="Gainsboro"
              />
            </div>
            <Time>
              {review.reviewer_name}
              {', '}
              {review.date.slice(0, 10)}
            </Time>
          </div>
          <div>
            <h3>{review.summary}</h3>
            <p>{review.body}</p>
          </div>
          <div>
            {
              review.photos.length !== 0
                ? review.photos.map((photo, i) => (
                  <img
                    key={i}
                    src={photo.url}
                    width="100"
                    alt="header img"
                  />
                )) : (null)
            }
          </div>
          <div>
            <small>
              Helpful?
              {' '}
              <span onClick={() => setYes(yes + 1)}>Yes</span>
              {' '}
              (
              {yes}
              )
              {' | '}
              Report
            </small>
          </div>
          <hr />
        </>
      ) : (null)}
    </div>
  );
}
