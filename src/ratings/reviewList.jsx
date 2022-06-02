import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReviewListEntry from './reviewListEntry.jsx';
import Form from "./form.jsx";
import Popup from './modal.jsx'

const Scroll = styled.div`
  max-height: 700px;
  overflow: hidden ${({ height }) => (height > 400 ? 'scroll' : 'hidden')};
  margin-top: 30px;
`;

const ReviewContainer = styled.div`
  margin: 50px 50px 0 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: flex-start;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 200px 200px;
  margin-top: 30px;
  gap: 20px;
`;

const Button = styled.button`
  background-color: white;
  color: DimGray;
  padding: 26px 6px;
  font-size: 18px;
  font-family: Arial, Helvetica Neue Thin, sans-serif;
`;

export default function ReviewList({ reviews, product_id, filter, sort, meta}) {
  const [more, setMore] = useState(2);
  const [show, setShow] = useState(false);
  const [height, setHeight] = useState(0);
  const elementRef = React.useRef();
  const showModal = () => {
    setShow(true);
    document.documentElement.style.overflow = 'hidden';
  };
  const hideModal = () => {
    setShow(false);
    document.documentElement.style.overflow = 'scroll';
  };

  useEffect(() => {
    setHeight(elementRef.current.clientHeight);
  }, [reviews, filter]);

  useEffect(() => {
    setMore(2);
  }, [product_id, sort]);

  return (
    <div data-testid="reviewList">
      <Scroll height={height}>
        <ReviewContainer ref={elementRef}>
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
      </Scroll>
      <ButtonContainer>
        {more < reviews.length
          ? <Button type="button" onClick={() => setMore(more + 2)}> MORE REVIEWS </Button>
          : null}
        {' '}
        <Button type="button" onClick={showModal} data-testid="addReview"> ADD A REVIEW + </Button>
      </ButtonContainer>
      <Popup show={show} handleClose={hideModal}>
        <Form product_id={product_id} meta={meta} handleClose={hideModal} />
      </Popup>
    </div>

  );
}
