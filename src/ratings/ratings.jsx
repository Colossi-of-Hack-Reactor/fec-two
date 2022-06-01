import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReviewList from './reviewList.jsx';
import RatingList from './ratingList.jsx';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  gap: 100px;
  margin: 150px;
`;

const Clear = styled.label`
  color: blue;
  &:hover {
    color: tomato;
    text-decoration: underline;
  }
`;

export default function Ratings(props) {
  const [count, setCount] = useState(25);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('relevant');
  const [filter, setFilter] = useState({});
  const { product_id, setLoading, reviews, setReviews, meta, setMeta, ratingsRef } = props;

  useEffect(() => {
    setLoading((a) => a + 1);
    axios.get('/reviews/', {
      params: {
        count, page, sort, product_id
      },
    })
      .then((response) => {
        setReviews(response.data);
        setFilter({});
        setSort('relevant');
        setLoading((a) => a - 1);
      })
      .catch((err) => {
        // console.log('axios get reviews error', err);
        setLoading((a) => a - 1);
      });
  }, [count, page, product_id]);

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
        // console.log('axios get /reviews/meta error', err);
        setLoading((a) => a - 1);
      });
  }, [product_id]);

  const handleFilterRating = (value) => {
    const f = { ...filter };
    if (f[value]) {
      delete f[value];
    } else {
      f[value] = 1;
    }
    setFilter(f);
  };

  return (
    <GridContainer className="Ratings" ref={ratingsRef}>
      <div>
        <h3>RATINGS &amp; REVIEWS</h3>
        <RatingList meta={meta} handleFilterRating={handleFilterRating} />
      </div>
      <div>
        <h3>
          {reviews.length}
          {' '}
          reviews, sort by
          {' '}
          <select value={sort} onChange={(e) => setSort(e.target.value)} data-testid="sort">
            <option value="relevant">Relevant</option>
            <option value="helpful">Helpful</option>
            <option value="newest">Newest</option>
          </select>
          &nbsp;&nbsp;&nbsp;
          filtered by
          {' '}
          <label data-testid="filter">
            {Object.keys(filter).map((val, i) =>
              <span key={i}>{val}{' '}star,</span>
            )}
          </label>
          &nbsp;
          <Clear>
            <label onClick={() => setFilter({})}>clear filter</label>
          </Clear>
        </h3>
        <ReviewList
          reviews={reviews}
          setReviews={setReviews}
          product_id={product_id}
          filter={filter}
          sort={sort}
        />
      </div>
    </GridContainer>
  );
}
