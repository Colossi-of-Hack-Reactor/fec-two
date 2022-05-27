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

const Yes = styled.div`
  text-decoration: underline;
`;

export default function ReviewListEntry({ review, filter }) {
  const [yes, setYes] = useState(review.helpfulness);

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
              <u onClick={handleClickYes}>Yes</u>
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
