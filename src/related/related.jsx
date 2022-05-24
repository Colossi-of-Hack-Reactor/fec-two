/* eslint-disable camelcase */
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
          .then((productsArr) => {
            Promise.allSettled(relatedIds.map((id) => axios.get(`/products/${id}/styles`)))
              .then((promisesArr) => promisesArr.map((res) => (res.status === 'fulfilled' ? res.value.data : {})))
              .then((data) => productsArr.map((product, i) => Object.assign(data[i], product)))
              .then((finalProductArr) => setProducts(finalProductArr));
          });
      })
      .catch((err) => console.log('FAILURE', err));
  }, [product_id]);

  return (
    <div>
      {products.map((product) => {
        const altCards = [];
        product.results.forEach((altStyle) => {
          const {
            name, original_price, photos, sale_price = 0,
          } = altStyle;

          altCards.push({
            default: altStyle['default?'],
            category: product.category,
            style_name: name,
            original_price,
            sale_price,
            photos,
          });
        });
        let defaultIndex;
        altCards.forEach((card, i) => {
          if (card.default) {
            defaultIndex = i;
          }
        });
        return (
          <ProductCard product={product} cards={altCards} defaultIndex={defaultIndex} key={product.id} />
        );
      })}
    </div>
  );
}

export default Related;
