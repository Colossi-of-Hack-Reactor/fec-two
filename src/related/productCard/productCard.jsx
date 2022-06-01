/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import {
  SlimDiv, UnisizeImg, ActionBut,
} from '../css/cssProductCard';

const ProductCard = function ProductCard({
  product, cards, defaultIndex, rating = 0, outfits, setProduct_id, setOutfits, outfitsIdList, setOutfitsIdList, setUpdate,
}) {
  let [index, setIndex] = useState(defaultIndex);
  const [inOutfits, setInOutfits] = useState(false);
  useEffect((newIndex) => {
    if (outfitsIdList.includes(product.id)) {
      setInOutfits(true);
    }
    setIndex(newIndex || defaultIndex);
    setUpdate(true);
  }, ([]));

  const totalStyles = cards.length;

  const allStyles = cards.reduce((memo, card, i) => (i !== cards.length - 1 ? `${memo} ${card.style_name},` : `${memo} ${card.style_name}.`), '');

  const toggleOutfitStatus = (e) => {
    e.preventDefault();
    const newList = JSON.parse(JSON.stringify(outfits));
    const newIdList = outfitsIdList.slice();
    if (inOutfits) {
      newIdList.splice(outfitsIdList.indexOf(product.id), 1);
      delete newList[product.id];
    } else {
      newIdList.push(product.id);
      newList[product.id] = { product, cards, defaultIndex };
    }
    setOutfitsIdList(() => newIdList);
    setOutfits(() => newList);
    setInOutfits(!inOutfits);
  };

  const detailedView = (e) => (e.type === 'click' || e.code === 'Enter' ? setProduct_id(product.id) : null);

  const imgAltText = () => (index !== undefined ? `${cards[index].style_name}, category is ${cards[index].category}` : `Sorry, no physical description is available for this item. Product category is ${product.category} and comes in the following styles: ${allStyles}`);
  const ratingAltText = (prodRating) => {
    const wordEquivalents = {
      '.': 'point', 0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine',
    };
    let altText = '';
    prodRating.toFixed(1).toString().split('').forEach((char) => {
      altText += `${wordEquivalents[char]} `;
    });
    return altText;
  };
  const someNum = (prodRating) => (Math.floor(((prodRating - (prodRating % 0.25)) / 5) * 200));
  const findASale = (altProds) => {
    altProds.forEach((prod, i) => {
      index = prod.sale_price ? i : index;
    });
  };
  findASale(cards);

  return (
    <div style={{ margin: '20px' }}>
      <SlimDiv role="button" tabIndex="0" onKeyDown={(e) => detailedView(e)} onClick={(e) => detailedView(e)}>
        <UnisizeImg alt={imgAltText()} src={(index !== undefined && cards[index].photos[0].thumbnail_url) ? cards[index].photos[0].thumbnail_url : '/assets/android-chrome-192x192.png'} />
        <ul style={{ padding: '0px', listStyleType: 'none' }}>
          <li>{product.name}</li>
          <li>{`(${product.category})`}</li>
          {(index !== undefined && cards[index].sale_price) && <li style={{ color: "red" }}>{`$${cards[index].sale_price}`}</li>}
          {(index !== undefined && cards[index].sale_price) && <li><del>{`$${product.default_price}`}</del></li>}
          {((index !== undefined && !cards[index].sale_price) || index === undefined) && <li>{`$${product.default_price}`}</li>}
          <li>
            <div style={{ width: '200px', height: '40px', backgroundColor: 'black' }}>
              <div style={{ width: `${someNum(rating).toString()}px`, height: '40px', backgroundColor: 'yellow' }}>
                <img alt={`the average customer rating for this product is ${ratingAltText(rating)}stars`} src="assets/5-Black-Stars_Empty-Interior_White-Background.png" />
              </div>
            </div>
            <div>{`(Average Rating: ${rating.toFixed(1)})`}</div>
          </li>
        </ul>
      </SlimDiv>
      {!inOutfits ? <ActionBut type="button" aria-label="add to outfit" onClick={(e) => toggleOutfitStatus(e)}>Add this to my outfits!!</ActionBut> : <ActionBut type="button" aria-label="add to outfit" onClick={(e) => toggleOutfitStatus(e)}>{`Remove from my outfits :${'('}`}</ActionBut>}
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  outfits: PropTypes.object.isRequired,
  rating: PropTypes.number.isRequired,
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
