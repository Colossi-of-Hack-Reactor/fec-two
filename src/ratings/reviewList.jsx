import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReviewListEntry from './reviewListEntry.jsx';
import Form from "./form.jsx";
import Popup from './modal.jsx'

const Scroll = styled.div`
  max-height: 700px;
  overflow: hidden ${({ scroll }) => (scroll ? 'scroll' : 'hidden')};
`;

const ReviewContainer = styled.div`
  margin: 0 50px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 200px 200px;
  margin-top: 70px;
  gap: 30px;
`;

const Button = styled.button`
  background-color: WhiteSmoke;
  color: Black;
  padding: 26px 6px;
  font-size: 18px;
  font-family: Arial, Helvetica Neue Thin, sans-serif;
  border: none;
  box-shadow: 0px 0px 6px 6px rgba(0,0,0, .2);
  cursor: pointer;
`;

export default function ReviewList({ reviews, product_id, filter, sort, meta, product}) {
  const [more, setMore] = useState(2);
  const [show, setShow] = useState(false);
  const [scroll, setScroll] = useState(false);
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
    setMore(2);
    setScroll(false);
  }, [product_id, sort, reviews]);

  return (
    <div data-testid="reviewList">
      <Scroll scroll={scroll}>
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
          ? <Button type="button" onClick={() => {setMore(more + 2); setScroll(true); }}> MORE REVIEWS </Button>
          : null}
        {' '}
        <Button type="button" onClick={showModal} data-testid="addReview"> ADD A REVIEW + </Button>
      </ButtonContainer>
      <Popup show={show} handleClose={hideModal}>
        <Form product_id={product_id} meta={meta} product={product} handleClose={hideModal} />
      </Popup>
    </div>
  );
}
