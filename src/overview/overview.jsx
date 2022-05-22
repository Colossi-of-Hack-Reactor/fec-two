/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Product = styled.div`
color: blue;

&:hover {
  cursor: pointer;
}
`;

function Overview(props) {
  const [count, setCount] = useState(5);
  const [data, setData] = useState([]);
  const [product, setProduct] = useState({});
  const [page, setPage] = useState(1);
  const [styles, setStyles] = useState([]);
  const [related, setRelated] = useState([]);
  const { product_id, setProduct_id, setLoading } = props;

  useEffect(() => {
    setLoading((a) => a + 1);
    axios.get('/products', {
      params: {
        count, page,
      },
    })
      .then((response) => {
        setData(response.data);
        setLoading((a) => a - 1);
      })
      .catch((err) => {
        console.log('axios get products error', err);
        setLoading((a) => a - 1);
      });
  }, [count, page]);

  useEffect(() => {
    setLoading((a) => a + 1);
    axios.get(`/products/${product_id}`)
      .then((response) => {
        setProduct(response.data);
        return axios.get(`/products/${product_id}/styles`);
      })
      .then((response) => {
        setStyles(response.data.results);
        return axios.get(`/products/${product_id}/related`);
      })
      .then((response) => {
        setRelated(response.data);
        setLoading((a) => a - 1);
      })
      .catch((err) => {
        console.log('axios get products error', err);
        setLoading((a) => a - 1);
      });
  }, [product_id]);

  return (
    <>
      <form>
        <label>
          Product Count:
          <input
            type="number"
            name="count"
            label="count"
            value={count}
            min="1"
            onChange={(e) => {
              setCount(e.target.value);
            }}
          />
        </label>
        <label>
          Page:
          <input
            type="number"
            name="page"
            label="page"
            value={page}
            min="1"
            onChange={(e) => {
              setPage(e.target.value);
            }}
          />
        </label>
      </form>
      {data.length ? data.map((d) => (
        <Product key={d.id} data-testid="product" onClick={() => { setProduct_id(d.id); }}>
          <span>
            {d.id}
          </span>
          :
          {' '}
          {d.name}
        </Product>
      )) : <Product>No products.</Product>}
      {Object.keys(product).map((k) => (
        <div key={k}>
          {k}
          :
          {' '}
          {typeof product[k] === 'object' ? '[object]' : product[k] }
        </div>
      ))}
      {styles.map((k) => (
        <div key={k.style_id}>
          style_id
          :
          {' '}
          {k.style_id}
        </div>
      ))}
      {related.map((k, i) => (
        <div key={`${k}_${i}`}>
          {k}
        </div>
      ))}

    </>
  );
}

export default Overview;
