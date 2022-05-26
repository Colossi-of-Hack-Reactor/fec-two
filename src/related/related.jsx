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

  const compileOutfits = (productList) => {
    Promise.allSettled(productList.map((id) => axios.get(`/products/${id}`)))
      .then((promisesArr) => promisesArr.map((res) => (res.status === 'fulfilled' ? res.value.data : {})))
      .then((productsArr) => {
        Promise.allSettled(productList.map((id) => axios.get(`/products/${id}/styles`)))
          .then((promisesArr) => promisesArr.map((res) => (res.status === 'fulfilled' ? res.value.data : {})))
          .then((data) => productsArr.map((product, i) => Object.assign(data[i], product)))
          .then((finalProductArr) => setProducts(finalProductArr));
      })
      .catch((err) => console.log('FAILURE', err));
  };

  useEffect(() => {
    if (product_id) {
      axios.get(`/products/${product_id}/related`)
        .then((res) => res.data)
        .then((relatedIds) => {
          const uniqIdsList = relatedIds.filter((id, i) => relatedIds.indexOf(id) === i);
          compileOutfits(uniqIdsList);
        })
        .catch((err) => console.log('FAILURE', err));
    } else {
      compileOutfits(yourOutfits);
    }
  }, [product_id, yourOutfits]);

  return (
    <div>
      {product_id !== undefined ? <h3>Related Products</h3> : <h3>Your Outfits</h3>}
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
    </div>
  );
}

Related.propTypes = {
  product_id: PropTypes.number,
  yourOutfits: PropTypes.array.isRequired,
  setProduct_id: PropTypes.func.isRequired,
  setOutfits: PropTypes.func.isRequired,
};

Related.defaultProps = {
  product_id: undefined,
};

export default Related;
