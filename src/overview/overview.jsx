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

const Sale = styled.span`
  color: red;
  text-decoration: line-through;
  text-decoration-style: solid;
`;

function Overview(props) {
  const [count, setCount] = useState(5);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [page, setPage] = useState(1);
  const [styles, setStyles] = useState([]);
  const [style, setStyle] = useState(0);
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { product_id, setProduct_id, setLoading } = props;

  useEffect(() => {
    setLoading((a) => a + 1);
    axios.get('/products', {
      params: {
        count, page,
      },
    })
      .then((response) => {
        setProducts(response.data);
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
        setStyle(0);
        setLoading((a) => a - 1);
      })
      .catch((err) => {
        console.log('axios get products error', err);
        setLoading((a) => a - 1);
      });
  }, [product_id]);

  useEffect(() => {
    setSize(null);
    setQuantity(1);
  }, [style]);

  useEffect(() => {
    setQuantity(1);
  }, [size]);

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
      {products.length ? products.map((d) => (
        <Product key={d.id} data-testid="product" onClick={() => { setProduct_id(d.id); }}>
          <span>
            {d.id}
          </span>
          :
          {' '}
          {d.name}
        </Product>
      )) : <Product>No products.</Product>}
      <div>
        Rating
      </div>
      <div>
        Reviews
      </div>
      <div>
        Category:
        {' '}
        {product.category}
      </div>
      <div>
        Expanded Product Name:
        {' '}
        {product.name}
      </div>
      {styles[style] ? (
        <>
          <div>
            Price:
            {' '}
            {styles[style].sale_price ? (
              <>
                <Sale>
                  $
                  {styles[style].original_price}
                </Sale>
                {' '}
                $
                {styles[style].sale_price}
              </>
            ) : (
              <>
                $
                {styles[style].original_price}
              </>
            )}
          </div>
          <div>
            Style:
            {' '}
            <select
              name="style"
              onChange={(e) => {
                setStyle(e.target.value);
              }}
            >
              {styles.map((s, i) => (
                <option value={i} key={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            Select Size
            {' '}
            <select
              name="size"
              onChange={(e) => {
                setSize(e.target.value);
              }}
            >
              <option value={null}>
                Select
              </option>
              {Object.keys(styles[style].skus).map((sku, i) => (
                <option value={sku} key={sku}>
                  {styles[style].skus[sku].size}
                </option>
              ))}
            </select>
          </div>
          <div>
            Select Quantity
            {' '}
            <select
              name="quantity"
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              disabled={size === null}
            >
              {size === null || styles[style].skus[size] === undefined ? <option>-</option>
                : Array(Math.min(15, styles[style].skus[size].quantity))
                  .fill(0).map((v, i) => i + 1).map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
            </select>
          </div>
        </>
      ) : ''}
      <div>
        Add to Bag
      </div>
      <div>
        Star
      </div>
      <div>
        Slogan:
        {' '}
      </div>
      <div>
        Description:
        {' '}
      </div>
    </>
  );
}

export default Overview;
