/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import StarRatings from 'react-star-ratings';
import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import {
  SlimDiv, UnisizeImg, LeftActionBut, RightActionBut,
} from '../css/cssProductCard';

const ProductCard = function ProductCard({
  product, cards, defaultIndex, rating = 0, outfits, setProduct_id, setOutfits, outfitsIdList, setOutfitsIdList, setUpdate, product_id
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
  // const someNum = (prodRating) => (Math.floor(((prodRating - (prodRating % 0.25)) / 5) * 200));
  const someNum = (prodRating) => prodRating - (prodRating % 0.25);
  const findASaleOrAPic = (altProds) => {
    altProds.forEach((prod, i) => {
      index = prod.sale_price ? i : index;
    });
    index = index || 0;
    if (!altProds[index].sale_price) {
      for (let i = 0; i < altProds.length; i += 1) {
        if (altProds[i].photos[0].thumbnail_url !== undefined) {
          index = i;
          break;
        }
      }
    }
  };
  findASaleOrAPic(cards); // for test only
  return (
    <div style={{ marginLeft: '20px', marginRight: '20px', position: 'relative' }}>
      {product.id !== product_id ? (
        <div>
        <SlimDiv role="button" tabIndex="0" onKeyDown={(e) => detailedView(e)} onClick={(e) => detailedView(e)}>
          <UnisizeImg alt={imgAltText()} src={(index !== undefined && cards[index].photos[0].thumbnail_url) ? cards[index].photos[0].thumbnail_url : '/assets/android-chrome-192x192.png'} />
          <ul style={{ padding: '0px', margin: '0px', listStyleType: 'none' }}>
            <li>{product.name}</li>
            <li>{`(${product.category})`}</li>
            {(index !== undefined && cards[index].sale_price) && <li style={{ color: 'red' }}>{`$${cards[index].sale_price}`}</li>}
            {(index !== undefined && cards[index].sale_price) && <li><del>{`$${product.default_price}`}</del></li>}
            {((index !== undefined && !cards[index].sale_price) || index === undefined) && <li>{`$${product.default_price}`}</li>}
            {(index !== undefined && !cards[index].sale_price) && <li><br /></li>}
            <li>
              <div style={{ width: '200px', height: '20px' }}>
                <StarRatings
                  style={{ margin: '0px', padding: '0px' }}
                  alt={`the average customer rating for this product is ${ratingAltText(rating)}stars`}
                  rating={someNum(rating)}
                  starDimension="20px"
                  starSpacing="5px"
                  starRatedColor="DimGray"
                  starEmptyColor="Gainsboro"
                />
              </div>
              <div>{`(Average Rating: ${rating.toFixed(1)})`}</div>
            </li>
          </ul>

        </SlimDiv>
        {!inOutfits ? <LeftActionBut type="button" aria-label="add to outfit" onClick={(e) => toggleOutfitStatus(e)}><img src="/assets/plus-round-line.svg" style={{ width: '30px', height: '30px' }} /></LeftActionBut> : <LeftActionBut type="button" aria-label="add to outfit" onClick={(e) => toggleOutfitStatus(e)}><img style={{ width: '30px', height: '30px' }} src='/assets/minus-round-line.svg' /></LeftActionBut>}
        {product.id !== product_id && <RightActionBut><img style={{ width: '30px', height: '30px' }} src="/assets/three-stars.png" /></RightActionBut>}</div>
      ) : <SlimDiv>{!inOutfits ?
        <LeftActionBut style={{ paddingLeft: '17px', paddingTop: '30px' }} type="button" aria-label="add to outfit" onClick={(e) => toggleOutfitStatus(e)}><img src="/assets/plus-round-line.svg" style={{ width: '200px', height: '200px' }} /><div style={{ paddingTop: '30px' }}>Add main product to outfits!</div>
        </LeftActionBut> :
        <LeftActionBut style={{ paddingLeft: '17px', paddingTop: '30px' }} type="button" aria-label="add to outfit" onClick={(e) => toggleOutfitStatus(e)}><img style={{ width: '200px', height: '200px' }} src="/assets/minus-round-line.svg" style={{ width: '200px', height: '200px' }} /><div style={{ paddingTop: '30px' }}>REMOVE main product from  outfits!</div>
        </LeftActionBut>
      }</SlimDiv>}
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
