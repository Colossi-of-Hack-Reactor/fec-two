/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import List from './css/cssRelated';
import ProductCard from './productCard.jsx';
import { compileOutfits, updateRelatedCards, populateAltCards } from './helpersRelated';
function Related({
  product_id, outfitsIdList, outfits, setProduct_id, setOutfits, setOutfitsIdList,
}) {
  let altCards = [];
  let defaultIndex;
  const [products, setProducts] = useState([]);

  const sectionHeader = (id) => (id !== undefined ? <h3>Related Products</h3> : <h3>Your Outfits</h3>);

  const cardElement = (product, cards, defaultIndex, key) => (
    <ProductCard product={product} cards={cards} defaultIndex={defaultIndex} key={key} outfits={outfits} outfitsIdList={outfitsIdList} setProduct_id={setProduct_id} setOutfits={setOutfits} setOutfitsIdList={setOutfitsIdList} />
  );

  useEffect(() => {
    updateRelatedCards(product_id, setProducts);
  }, [product_id]);

  return (
    <div>
      {sectionHeader(product_id)}
      <List>
        {product_id !== undefined ? products.map((product) => {
          altCards = [];
          defaultIndex = populateAltCards(product, altCards);
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
