/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import React, {
  useEffect, useState, useRef, useCallback,
} from 'react';
import styled from 'styled-components';
import _ from 'underscore';
import { PropTypes } from 'prop-types';
import CardList from './css/cssList';
import ProductCard from './productCard/productCard.jsx';
import { updateListCards, populateAltCards } from './helpersList';
import { SlimDiv } from './css/cssProductCard';
function List({
  product_id, outfitsIdList, outfits, setProduct_id, setOutfits, setOutfitsIdList, related
}) {
  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(false);
  const [windowSize, setWindowSize] = useState(0);
  const [leftListLim, setLeftListLim] = useState(0);
  const [rightListLim, setRightListLim] = useState(0);
  const [slots, setSlots] = useState(0);
  const [leftOfListBorder, setLeftOfListBorder] = useState(false);
  const [shift, setShift] = useState(0);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(true);
  const [mListSize, setMaxListSize] = useState(0);

  const cardBody = 200;
  const windowPadding = 8;
  const scrollBar = 20;
  const listPadding = 20;
  const listBorder = 1;
  const cardMarging = 20;
  const cardBorder = 2;
  const cardPadding = 20;
  const buttonWidth = 70;
  const slack = 50;
  let altCards = [];
  let defaultIndex;
  const listRef = useRef();
  const determineArrowDisplay = _.debounce((event) => {
    !isNaN(window.innerWidth) && setWindowSize(window.innerWidth - scrollBar);
  }, 500);

  useEffect(() => {
    if (update) {
      const cardSize = mListSize / products.length;
      const minListSize = cardSize;
      const newListSize = (cardSize * Math.floor((window.innerWidth - scrollBar - 2 * buttonWidth) / cardSize));
      const starterListSize = (newListSize > mListSize ? mListSize : newListSize < minListSize ? minListSize : newListSize);
      if (window.innerWidth >= mListSize + buttonWidth) {
        setRightListLim(20000);
        setLeftListLim(starterListSize + 2 * buttonWidth);
        setSlots(products.length);
      } else if (newListSize < minListSize) {
        setRightListLim(starterListSize + 2 * buttonWidth);
        setLeftListLim(minListSize + 2 * buttonWidth);
        setSlots(1);
      } else if (windowSize > rightListLim) {
        setRightListLim(starterListSize + cardSize + 2 * buttonWidth);
        setLeftListLim(starterListSize + 2 * buttonWidth);
        setSlots(starterListSize / cardSize);
        //setShift(products.length - starterListSize / cardSize);
      } else if (windowSize < leftListLim) {
        setRightListLim(newListSize + cardSize + 2 * buttonWidth);
        setLeftListLim(newListSize + 2 * buttonWidth);
        setSlots(newListSize / cardSize);
      }
    }
  }, [windowSize]);
  useEffect(() => {
    if (update) {
      const listEl = listRef.current.getBoundingClientRect();
      const cardSize = listEl.width / products.length;
      const maxListSize = cardSize * products.length;
      setMaxListSize(maxListSize);
      const minListSize = cardSize;
      const newListSize = (cardSize * Math.floor((window.innerWidth - scrollBar - 2 * buttonWidth) / cardSize));
      const starterListSize = (newListSize > maxListSize ? maxListSize : newListSize < minListSize ? minListSize : newListSize);
      setWindowSize(window.innerWidth - scrollBar);
      if (window.innerWidth - scrollBar >= maxListSize + buttonWidth) {
        setRightListLim(20000);
        setSlots(products.length);
      } else if (newListSize < minListSize) {
        setRightListLim(starterListSize + 2 * buttonWidth);
        setSlots(1);
      } else {
        setRightListLim(starterListSize + cardSize + 2 * buttonWidth);
        setSlots(starterListSize / cardSize);
      }
      setLeftListLim(starterListSize + 2 * buttonWidth);
    }
    window.addEventListener('resize', determineArrowDisplay);
    return () => window.removeEventListener('resize', determineArrowDisplay);
  }, [update]);

  useEffect(() => {
    updateListCards(product_id, setProducts, related);
  }, [product_id]);
  useEffect(() => {
    if (shift > 0) {
      setShowLeftArrow(true);
    } else {
      setShowLeftArrow(false);
    }
    if (slots + shift === products.length) {
      setShowRightArrow(false);
    } else if (slots + shift < products.length) {
      setShowRightArrow(true);
    } else if (slots === products.length) {
      setShift(0);
    }
  }, [slots, shift]);

  const sectionHeader = (id) => (id !== undefined ? <h3>List Products</h3> : <h3>Your Outfits</h3>);

  const cardElement = (product, cards, defaultIndex, key, related, product_id) => (
    <ProductCard product={product} cards={cards} defaultIndex={defaultIndex} key={key} rating={product.rating} outfits={outfits} outfitsIdList={outfitsIdList} setProduct_id={setProduct_id} setOutfits={setOutfits} setOutfitsIdList={setOutfitsIdList} setUpdate={setUpdate} related={related} product_id={product_id} />
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '50px auto 50px' }}>
      <LeftButton showLeftArrow={showLeftArrow} shift={shift} setShift={setShift} />
      <div>
        {sectionHeader(product_id)}
        <CardList ref={listRef}>
          {related ? products.slice(0 + shift, (slots || products.length) + shift).map((product) => {
            altCards = [];
            defaultIndex = populateAltCards(product, altCards);
            return cardElement(product, altCards, defaultIndex, product.id);
          }) : (
            <div style={{ display: 'flex', maxWidth: '285' }}>
              <div>
                {products.map((product) => {
                  altCards = [];
                  defaultIndex = populateAltCards(product, altCards);
                  return cardElement(product, altCards, defaultIndex, product.id, related, product_id);
                })}
              </div>
              {
                outfitsIdList.slice(0 + shift, (slots - 1 || outfitsIdList.length) + shift).map((id) => {
                  const outfit = outfits[id];
                  return cardElement(outfit.product, outfit.cards, outfit.defaultIndex, outfit.product.id, related, product_id);
                })
              }
            </div>
          )}
        </CardList>
      </div>
      <RightButton showRightArrow={showRightArrow} shift={shift} setShift={setShift} />
    </div>
  );
}

List.propTypes = {
  product_id: PropTypes.number,
  outfitsIdList: PropTypes.array.isRequired,
  outfits: PropTypes.object.isRequired,
  setProduct_id: PropTypes.func.isRequired,
  setOutfits: PropTypes.func.isRequired,
  setOutfitsIdList: PropTypes.func.isRequired,
};

List.defaultProps = {
  product_id: undefined,
};

export default List;

function RightButton({ showRightArrow, shift, setShift }) {
  return (
    <div style={{ paddingTop: '250px' }}>
      {showRightArrow && <img style={{ width:'50px', height: '50px'}} src="/assets/angle-circle-right.svg" type="button" onClick={() => setShift(shift + 1)}/>}
    </div>
  );
}
function LeftButton({ showLeftArrow, shift, setShift }) {
  return (
    <div style={{ paddingTop: '250px' }}>
      {showLeftArrow && <img style={{ width:'50px', height: '50px'}} src="/assets/angle-circle-left.svg" type="button" onClick={() => setShift(shift - 1)}/>}
    </div>
  );
}
