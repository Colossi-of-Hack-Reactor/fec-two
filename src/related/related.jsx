/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import List from './css/cssRelated';
import ProductCard from './productCard.jsx';

function Related({
  product_id, yourOutfits, setProduct_id, setOutfits,
}) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get(`/products/${product_id}/related`)
      .then((res) => res.data)
      .then((relatedIds) => {
        const uniqIdsList = relatedIds.filter((id, i) => relatedIds.indexOf(id) === i);
        Promise.allSettled(uniqIdsList.map((id) => axios.get(`/products/${id}`)))
          .then((promisesArr) => promisesArr.map((res) => (res.status === 'fulfilled' ? res.value.data : {})))
          .then((productsArr) => {
            Promise.allSettled(uniqIdsList.map((id) => axios.get(`/products/${id}/styles`)))
              .then((promisesArr) => promisesArr.map((res) => (res.status === 'fulfilled' ? res.value.data : {})))
              .then((data) => productsArr.map((product, i) => Object.assign(data[i], product)))
              .then((finalProductArr) => setProducts(finalProductArr));
          });
      })
      .catch((err) => console.log('FAILURE', err));
  }, [product_id]);
  const styles = {
    display: 'flex', width: 'fit-content', border: '1px solid #E6E6E6', 'border-radius': '10px', padding: '20px',
  };
  return (
    <List>
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
          // eslint-disable-next-line max-len
          <ProductCard product={product} cards={altCards} defaultIndex={defaultIndex} key={product.id} setProduct_id={setProduct_id} setOutfits={setOutfits} yourOutfits={yourOutfits} />
        );
      })}
    </List>
  );
}

Related.propTypes = {
  product_id: PropTypes.number.isRequired,
  yourOutfits: PropTypes.array.isRequired,
  setProduct_id: PropTypes.func.isRequired,
  setOutfits: PropTypes.func.isRequired,
};

export default Related;
