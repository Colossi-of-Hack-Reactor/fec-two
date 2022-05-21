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
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get('/products')
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log('axios get products error', err);
      });
  }, []);

  useEffect(() => {
    axios.get(`/products/${props.product_id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        console.log('axios get products error', err);
      });
  }, [props.product_id]);

  return (
    <div className="overview">
      <button type="button" onClick={() => { setCount(count + 1); }}>
        Click to increase OVERVIEW.
      </button>
      <p>
        Overview:
        {count}
      </p>
      {data.length ? data.map((d) => (
        <Product key={d.id} onClick={() => { props.setProduct_id(d.id); }}>
          <span>
            {d.id}
          </span>
          :
          {' '}
          {d.name}
        </Product>
      )) : <Product>No products.</Product>}
      {Object.keys(product).map((k) => (
        <p key={k}>
          {k}
          :
          {JSON.stringify(product[k])}
        </p>
      ))}
    </div>
  );
}

export default Overview;
