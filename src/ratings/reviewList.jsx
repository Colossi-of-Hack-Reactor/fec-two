import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReviewListEntry from './reviewListEntry.jsx';
import Form from "./form.jsx";
import Popup from './modal.jsx'

const Scroll = styled.div`
  max-height: 500px;
  overflow: hidden ${({ height }) => (height > 500 ? 'scroll' : 'hidden')};
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
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
  font-family: Arial, Helvetica, sans-serif;
`;

export default function ReviewList({ reviews, product_id, filter, sort }) {
  const [more, setMore] = useState(2);
  const [show, setShow] = useState(false);
  const [height, setHeight] = useState(0);
  const elementRef = React.useRef();

  useEffect(() => {
    setHeight(elementRef.current.clientHeight);
  }, [reviews, filter]);

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  // const sortReview = () => {
  // reviews.sort((a, b) => b.date.localeCompare(a.date));
  // };
  useEffect(() => {
    if (sort === 'newest') {
      reviews.sort((a, b) => b.date.localeCompare(a.date));
    } else if (sort === 'helpful') {
      reviews.sort((a, b) => b.helpfulness - a.helpfulness);
    }
  }, [sort]);

  console.log(sort);
  return (
    <div>
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
        <Button type="button" onClick={showModal}> ADD A REVIEW + </Button>
      </ButtonContainer>
      <Popup show={show} handleClose={hideModal}>
        <Form product_id={product_id} />
      </Popup>
    </div>

  );
}
