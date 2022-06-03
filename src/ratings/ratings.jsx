import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReviewList from './reviewList.jsx';
import RatingList from './ratingList.jsx';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 70%;
  gap: 100px;
  margin: 200px 0;
`;

const Select = styled.select`
  border: 0;
  outline: 0;
  background: #e9ecef;
  text-decoration: underline;
  font-size: 20px;
  width: 100px;
  &:hover {
    color: rgb(230, 67, 47);
    cursor: pointer;
  }
`;

const Header = styled.div`
  font-family: Arial, Helvetica Neue;
  font-size: 20px;
  margin: 100px 0 10px;
`;

export default function Ratings(props) {
  const [count, setCount] = useState(25);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('relevant');
  const [filter, setFilter] = useState({});
  const { product_id, setLoading, reviews, setReviews, meta, setMeta, ratingsRef, product } = props;

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
        console.log('axios get reviews error', err);
        setLoading((a) => a - 1);
      });
  }, [count, page, product_id]);

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
        setLoading((a) => a - 1);
      })
      .catch((err) => {
        console.log('axios get sort reviews error', err);
        setLoading((a) => a - 1);
      });
  }, [sort]);

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
        <h4>RATINGS &amp; REVIEWS</h4>
        <RatingList meta={meta} filter={filter} handleFilterRating={handleFilterRating} setFilter={setFilter}/>
      </div>
      <div>
        <Header>
          {reviews.length}
          {' '}
          reviews, sorted by
          {' '}
          <Select  value={sort} onChange={(e) => setSort(e.target.value)} data-testid="sort">
            <option value="relevant">relevant</option>
            <option value="helpful">helpful</option>
            <option value="newest">newest</option>
          </Select>
          &nbsp;&nbsp;&nbsp;
        </Header>
        <ReviewList
          reviews={reviews}
          product_id={product_id}
          filter={filter}
          sort={sort}
          meta={meta}
          product={product}
        />
      </div>
    </GridContainer>
  );
}
