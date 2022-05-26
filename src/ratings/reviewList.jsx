import React, { useState, useEffect } from 'react';
import ReviewListEntry from './reviewListEntry.jsx';
import Form from "./form.jsx";
import Popup from './modal.jsx'
import { Flex, FormContainer } from './flex.styled.jsx';

export default function ReviewList({ reviews, product_id, rating }) {
  const [more, setMore] = useState('false');
  const [show, setShow] = useState('false');

  const showModal = () => {
    setShow('true');
  };

  const hideModal = () => {
    setShow('false');
  };

  useEffect(() => {
    setSize('Select');
    setQuantity(1);
    setImage(0);
  }, [rating]);

  return (
    <div>
      <div>
        {reviews.map((review) => (
          // review.rating
          <ReviewListEntry
            key={review.review_id}
            review={review}
          />
        ))}
      </div>
      <div>
        <button type="button" onClick={() => setMore('true')}> MORE REVIEWS </button>
        {' '}
        <button type="button" onClick={showModal}> ADD A REVIEW + </button>
      </div>
      <Popup show={show} handleClose={hideModal}>
      <FormContainer><Form product_id={product_id} /></FormContainer>
      </Popup>
    </div>
  );
}
