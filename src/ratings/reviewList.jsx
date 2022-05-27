import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReviewListEntry from './reviewListEntry.jsx';
import Form from "./form.jsx";
import Popup from './modal.jsx'

const Button = styled.button`
  background-color: white;
  color: DimGray;
  padding: 26px 6px;
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
`;

const ReviewContainer = styled.div`
  margin-top: 30px;
  display: grid;
  gap: 30px;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 200px 200px;
  margin-top: 30px;
  gap: 20px;
`;

export default function ReviewList({ reviews, product_id, filter, sort }) {
  const [more, setMore] = useState(2);
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  // // const sortReview = () => {
  //   reviews.sort((a, b) => b[sort] - a[sort]);
  // // };

  return (
    <div>
      <ReviewContainer>
        {reviews.map((review, i) => {
          if (i < more) {
            return (
              <ReviewListEntry
                key={review.review_id}
                review={review}
                filter={filter}
              />
            );
          }
        })}
      </ReviewContainer>
      <ButtonContainer>
        {more < reviews.length
          ? <Button type="button" onClick={() => setMore(more + 2)}> MORE REVIEWS </Button>
          : null}
        {' '}
        <Button type="button" onClick={showModal}> ADD A REVIEW + </Button>
      </ButtonContainer>
      <Popup show={show} handleClose={hideModal}>
        <Form product_id={product_id} />
      </Popup>
    </div>

  );
}
