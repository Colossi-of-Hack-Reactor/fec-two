/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import List from './css/cssRelated';
import ProductCard from './productCard.jsx';

function Related({
  product_id, outfitsIdList, outfits, setProduct_id, setOutfits, setOutfitsIdList,
}) {
  const [products, setProducts] = useState([]);
  const altCards = [];
  let defaultIndex;
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

  const updateRelatedCards = (product_id) => {
    if (product_id !== undefined) {
      axios.get(`/products/${product_id}/related`)
        .then((res) => res.data)
        .then((relatedIds) => {
          const uniqIdsList = relatedIds.filter((id, i) => relatedIds.indexOf(id) === i);
          compileOutfits(uniqIdsList);
        })
        .catch((err) => console.log('FAILURE', err));
    }
  };

  const populateAltCards = (product) => {
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
    altCards.forEach((card, i) => {
      if (card.default) {
        defaultIndex = i;
      }
    });
  };
  const cardElement = (product, cards, defaultIndex, key) => (
    <ProductCard product={product} cards={cards} defaultIndex={defaultIndex} key={key} outfits={outfits} outfitsIdList={outfitsIdList} setProduct_id={setProduct_id} setOutfits={setOutfits} setOutfitsIdList={setOutfitsIdList} />
  );
  const sectionHeader = (id) => (id !== undefined ? <h3>Related Products</h3> : <h3>Your Outfits</h3>);

  useEffect(() => {
    updateRelatedCards(product_id);
  }, [product_id]);

  return (
    <div>
      {sectionHeader(product_id)}
      <List>
        {product_id !== undefined ? products.map((product) => {
          populateAltCards(product);
          return cardElement(product, altCards, defaultIndex, product.id);
        }) : outfitsIdList.map((id) => {
          const outfit = outfits[id];
          return cardElement(outfit.product, outfit.cards, outfit.defaultIndex, outfit.product.id);
        })}
      </List>
    </div>
  );
}

Related.propTypes = {
  product_id: PropTypes.number,
  outfitsIdList: PropTypes.array.isRequired,
  outfits: PropTypes.object.isRequired,
  setProduct_id: PropTypes.func.isRequired,
  setOutfits: PropTypes.func.isRequired,
  setOutfitsIdList: PropTypes.func.isRequired,
};

Related.defaultProps = {
  product_id: undefined,
};

export default Related;
