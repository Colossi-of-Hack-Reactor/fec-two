import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductCard } from './productCard.jsx';

function Related({ product_id }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get(`/products/${product_id}/related`)
      .then((res) => res.data)
      .then((relatedIds) => {
        Promise.allSettled(relatedIds.map((id) => axios.get(`/products/${id}`)))
          .then((promisesArr) => promisesArr.map((res) => (res.status === 'fulfilled' ? res.value.data : {})))
          .then((productsArr) => {
            Promise.allSettled(relatedIds.map((id) => axios.get(`/products/${id}/styles`)))
              .then((promisesArr) => promisesArr.map((res) => (res.status === 'fulfilled' ? res.value.data : {})))
              .then((data) => productsArr.map((product, i) => Object.assign(data[i], product)))
              .then(finalProductArr => setProducts(finalProductArr));
          });
      })
      .catch((err) => console.log('FAILURE', err));
  }, []);
  return console.log(products)
  // return <div>{products.map((product) => <ProductCard product={product} key={product.id} />)}</div>;
}


export default Related;