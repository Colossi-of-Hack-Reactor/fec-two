/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import {
  SlimDiv, UnisizeImg, ActionBut,
} from './css/cssProductCard';

const ProductCard = function ProductCard({
  product, cards, defaultIndex, outfits, setProduct_id, setOutfits, outfitsIdList, setOutfitsIdList,
}) {
  const [index, setIndex] = useState(defaultIndex);
  const [inOutfits, setInOutfits] = useState(false);
  useEffect((newIndex) => {
    if (outfitsIdList.includes(product.id)) {
      setInOutfits(true);
    }
    setIndex(newIndex || defaultIndex);
  }, ([index]));

  const totalStyles = cards.length;

  const allStyles = cards.reduce((memo, card, i) => (i !== cards.length - 1 ? `${memo} ${card.style_name},` : `${memo} ${card.style_name}.`), '');

  const toggleOutfitStatus = (e) => {
    e.preventDefault();
    const newList = JSON.parse(JSON.stringify(outfits));
    const newIdList = outfitsIdList.slice();
    if (inOutfits) {
      console.log('where is this?', product);
      newIdList.splice(outfitsIdList.indexOf(product.id), 1);
      delete newList[product.id];
    } else {
      newIdList.push(product.id);
      newList[product.id] = { product, cards, defaultIndex };
    }
    setOutfitsIdList(outfitsIdList => newIdList);
    setOutfits(outfits => newList);
    setInOutfits(!inOutfits);
  };

  const detailedView = (e) => (e.type === 'click' || e.code === 'Enter' ? setProduct_id(product.id) : null);

  const margin = { margin: '30px' };

  return (
    <div style={margin}>
      <SlimDiv role="button" tabIndex="0" onKeyDown={(e) => detailedView(e)} onClick={(e) => detailedView(e)}>
        <UnisizeImg alt={index !== undefined ? `${cards[index].style_name}, category is ${cards[index].category}` : `Sorry, no physical description is available for this item. Product category is ${product.category} and comes in the following styles: ${allStyles}`} src={(index !== undefined && cards[index].photos[0].thumbnail_url) ? cards[index].photos[0].thumbnail_url : '/assets/android-chrome-192x192.png'} />
        <div>
          <br />
          {`product id: ${product.id}`}
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
      {!inOutfits ? <ActionBut type="button" aria-label="add to outfit" onClick={(e) => toggleOutfitStatus(e)}>Add this to my outfits!!</ActionBut> : <ActionBut type="button" aria-label="add to outfit" onClick={(e) => toggleOutfitStatus(e)}>{`Remove from my outfits :${'('}`}</ActionBut>}
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  outfits: PropTypes.object.isRequired,
  outfitsIdList: PropTypes.array.isRequired,
  setProduct_id: PropTypes.func.isRequired,
  setOutfits: PropTypes.func.isRequired,
  setOutfitsIdList: PropTypes.func.isRequired,
  defaultIndex: PropTypes.any,
};

ProductCard.defaultProps = {
  defaultIndex: undefined,
};

export default ProductCard;
