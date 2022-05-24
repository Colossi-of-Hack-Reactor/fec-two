import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './productCard.jsx';

function Related({ product_id }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get(`/products/${product_id}/related`)
      .then((res) => res.data)
      .then((relatedIds) => {
        Promise.allSettled(relatedIds.map((id) => axios.get(`/products/${id}`)))
          .then((promisesArr) => promisesArr.map((res) => (res.status === 'fulfilled' ? res.value.data : {})))
          .then((productArr) => setProducts(productArr));
      })
      .catch((err) => console.log('FAILURE', err));
  }, []);
}
// console.log(products)
// return (${products.map((product) => <ProductCard product={product} />)})
export default Related;