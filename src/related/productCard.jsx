/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const SlimDiv = styled.div`
  display: inline-block;
  width: 300;
  height: 800;
  padding: 30px
  `;
const UniformImg = styled.img`
  max-height: 400px;
  max-width: 200px;
  height: auto;
  width: auto;
`;

const ProductCard = function ProductCard({
  product, cards, defaultIndex, yourOutfits, setProduct_id, setOutfits,
}) {
  const [index, setIndex] = useState(defaultIndex);
  useEffect((newIndex) => {
    setIndex(newIndex || defaultIndex);
  }, ([index]));

  const totalStyles = cards.length;
  const allStyles = cards.reduce((memo, card, i) => (i !== cards.length - 1 ? `${memo} ${card.style_name},` : `${memo} ${card.style_name}.`), '');

  const addOutfit = (e) => {
    e.preventDefault();
    yourOutfits.push(product.id);
    setOutfits();
  };

  const detailedView = (e) => {
    e.preventDefault();
    setProduct_id(product.id);
  };

  return (
    <SlimDiv>
      <button type="button" aria-label="add to outfit" onClick={(e) => addOutfit(e)}>Add this outfit!</button>
      <div role="button" tabIndex="0" onSubmit={(e) => detailedView(e)}>
        <div>
          <UniformImg alt={index !== undefined ? `${cards[index].style_name}, category is ${cards[index].category}` : `Sorry, no physical description is available for this item. Product category is ${product.category} and comes in the following styles: ${allStyles}`} src={(index !== undefined && cards[index].photos[0].thumbnail_url) ? cards[index].photos[0].thumbnail_url : '/assets/android-chrome-192x192.png'} />
          </div>
        <br />
        product id: {product.id}
        <br />
        {product.name}
        <br />
        {product.category}
        <br />
        {index !== undefined ? cards[index].original_price : product.default_price}
        <br />
        Ratings go here
      </div>
    </SlimDiv>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  yourOutfits: PropTypes.array.isRequired,
  setProduct_id: PropTypes.func.isRequired,
  setOutfits: PropTypes.func.isRequired,
  defaultIndex: PropTypes.any,
};

ProductCard.defaultProps = {
  defaultIndex: undefined,
};

export default ProductCard;
