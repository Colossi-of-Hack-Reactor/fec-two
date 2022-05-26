import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReviewList from './reviewList.jsx';
import RatingList from './ratingList.jsx';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 400px auto;
  gap: 50px;
  margin: 150px;
`;

export default function Ratings(props) {
  const [count, setCount] = useState(5);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('relevant');
  const [reviews, setReviews] = useState([]);
  const [meta, setMeta] = useState({});
  const [rating, setRating] = useState('');
  const { product_id, setProduct_id, setLoading } = props;

  useEffect(() => {
    setLoading((a) => a + 1);
    axios.get('/reviews/', {
      params: {
        count, page, sort, product_id
      },
    })
      .then((response) => {
        setReviews(response.data);
        setLoading((a) => a - 1);
      })
      .catch((err) => {
        console.log('axios get reviews error', err);
        setLoading((a) => a - 1);
      });
  }, [count, page, sort, product_id]);

  useEffect(() => {
    setLoading((a) => a + 1);
    axios.get('/reviews/meta', {
      params: {
        product_id
      },
    })
      .then((response) => {
        setMeta(
          response.data,
        );
        setLoading((a) => a - 1);
      })
      .catch((err) => {
        console.log('axios get /reviews/meta error', err);
        setLoading((a) => a - 1);
      });
  }, [product_id]);

  return (
    <GridContainer>
      <div>
        <h3>RATINGS &amp; REVIEWS</h3>
        <RatingList meta={meta} setRating={setRating} />
      </div>
      <div>
        <h3>
          {reviews.length}
          {' '}
          reviews, sort by
          {' '}
          {sort}
        </h3>
        <hr />
        <ReviewList reviews={reviews} product_id={product_id} rating={rating} />
      </div>
    </GridContainer>
  );
}
