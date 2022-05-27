import React, { useState, useEffect } from 'react';
import ReviewListEntry from './reviewListEntry.jsx';
import Form from "./form.jsx";
import Popup from './modal.jsx'

export default function ReviewList({ reviews, product_id, filter, sort }) {
  const [more, setMore] = useState(2);
  const [show, setShow] = useState(false);
  // const [data, setData] = useState(reviews);

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
      <div>
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
      </div>
      <div>
        { more < reviews.length ? <button type="button" onClick={() => setMore(more + 2)}> MORE REVIEWS </button> : null}
        {' '}
        <button type="button" onClick={showModal}> ADD A REVIEW + </button>
      </div>
      <Popup show={show} handleClose={hideModal}>
        <Form product_id={product_id} />
      </Popup>
    </div>
  );
}
