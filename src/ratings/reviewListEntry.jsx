import React, { useState } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import styled from "styled-components";

const Time = styled.div`
  padding-top: 5px;
  font-size: 14px;
  font-weight: 100;
  position: absolute;
  right: 60px;
`;

const Help = styled.label`
  text-decoration: underline;
  &:hover {
    color: tomato;
  }
`;

export default function ReviewListEntry({ review, filter }) {
  const [yes, setYes] = useState(review.helpfulness);
  const [report, setReport] = useState(false);

  const handleClickYes = () => {
    axios.put(`/reviews/${review.review_id}/helpful`, {
      params: { review_id: review.review_id },
    })
      .then(() => {
        setYes(yes + 1);
      })
      .catch((err) => {
        console.log('Error putting helpful review', err);
      });
  };

  const handleClickReport = () => {
    axios.put(`/reviews/${review.review_id}/report`, {
      params: { review_id: review.review_id },
    })
      .then(() => {
        setReport(true);
      })
      .catch((err) => {
        console.log('Error putting report review', err);
      });
  };

  return (
    <div>
      {report === false
        && (filter[review.rating] !== undefined || Object.keys(filter).length === 0) ? (
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
          {review.recommend ? <span>&#10003;&nbsp;I recommend this product</span> : null}
          {review.response ? <p>{review.response}</p> : null}
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
            Helpful?
            &nbsp;
            <Help onClick={handleClickYes}>Yes</Help>
            {' '}
            (
            {yes}
            )
            &nbsp;&nbsp;
            |
            &nbsp;&nbsp;&nbsp;
            <Help onClick={handleClickReport}>Report</Help>
          </div>
          <hr />
        </>
        ) : (null)}
    </div>
  );
}
