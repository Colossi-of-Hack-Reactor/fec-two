import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReviewList from "./reviewList.jsx";
import RatingList from "./ratingList.jsx";
import Form from "./form.jsx";

const FormStyle = styled.div`
color: purple;
`;

function Ratings(props) {
  const [count, setCount] = useState(5);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('relevant');
  const [reviews, setReviews] = useState([]);
  const [meta, setMeta] = useState({ product_id: '' });
  const [ratings, setRatings] = useState({});
  const { product_id, setProduct_id, setLoading } = props;

  useEffect(() => {
    setLoading((a) => a + 1);
    axios.get('/reviews/', {
      params: {
        count, page, sort, product_id
      },
    })
      .then((response) => {
        // console.log(response.data);
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
        // setRatings(response.data.ratings);
        setMeta({
          product_id: response.data.product_id,
          // ratings: response.data.ratings,
          // recommended: response.data.recommended,
        });
        console.log(response.data.product_id);
        setLoading((a) => a - 1);
      })
      .catch((err) => {
        // console.log('axios get reviews error', err);
        setLoading((a) => a - 1);
      });
    console.log(meta);
  }, [product_id]);

  return (
    <div>
      <div>
        {/* <RatingList meta={meta} /> */}
      </div>
      <div>
        {reviews.length}
        {' '}
        reviews, sort by
        {' '}
        {sort}
      </div>
      <ReviewList reviews={reviews} />
      <FormStyle><Form product_id={product_id} /></FormStyle>
    </div>
  );
}

export default Ratings;
