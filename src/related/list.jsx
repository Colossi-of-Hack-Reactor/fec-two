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


//product dipslya -> [o+ shift, max - 1 + shift]
// shift + (max - 1) = products.length - 1 -> right button = false
// shift + (max - 1) < products.length - 1 -> right button = true
// shift > 0 -> ;left button = true
// shift = 0 -> left button = false
// scrensize < max * cardwidth -> max - 1
// screensize > max * cardwidth -> max + 1
// maxSlots = screensize / card width - button left - button right
function List({
  product_id, outfitsIdList, outfits, setProduct_id, setOutfits, setOutfitsIdList,
}) {
  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(false);
  const [windowSize, setWindowSize] = useState(0);
  const [leftListLim, setLeftListLim] = useState(0);
  const [rightListLim, setRightListLim] = useState(0)
  const [slots, setSlots] = useState(0);
  const [leftOfListBorder, setLeftOfListBorder] = useState(false);
  const [shift, setShift] = useState(0);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(true);

  const cardBody = 200;
  const windowPadding = 8;
  const scrollBar = 20;
  const listPadding = 20;
  const listBorder = 1;
  const cardMarging = 20;
  const cardBorder = 2;
  const cardPadding = 20;
  const buttonWidth = 50;
  const slack = 50;
  let altCards = [];
  let defaultIndex;
  const listRef = useRef();
  const determineArrowDisplay = _.debounce((event) => {
    setWindowSize(window.innerWidth - scrollBar);
  }, 500);
  useEffect(() => {
    const listEl = listRef.current.getBoundingClientRect();
    const cardSize = listEl.width / products.length;
    const maxListSize = cardSize * products.length;
    const minListSize = cardSize;
    const windowListSize = (cardSize * Math.floor((window.innerWidth - scrollBar - 2 * buttonWidth) / cardSize));
    const newListSize = (windowListSize > maxListSize ? maxListSize : windowListSize < minListSize ? minListSize : windowListSize)

    // if (windowSize > listSize && slots === products.length - 1) {
    //   setListSize(newListSize + buttonWidth);
    //   setSlots(newListSize / cardSize);
    //   // console .log('new list size', newListSize + 2 * buttonWidth);
    //   // console.log('new slots ', newListSize / cardSize);
    // } else if (windowSize < listSize) {
    //   setListSize(newListSize + 2 * buttonWidth);
    //   setSlots(newListSize / cardSize);
    //   // console.log('new list size', newListSize + 2 * buttonWidth);
    //   // console.log('new slots ', newListSize / cardSize);
    // } else if (windowSize > listSize + cardSize) {
    //   setListSize(newListSize + 2 * buttonWidth);
    //   setSlots(newListSize / cardSize);
    //   // console.log('new list size', newListSize + 2 * buttonWidth);
    //   // console.log('new slots ', newListSize / cardSize);
    // }

    //console.log('list length', listEl.width)//, (cardSize * Math.floor((window.innerWidth - scrollBar - slack) / cardSize)), starterSlots > products.length ? products.length : starterSlots);
  }, [windowSize]);

  useEffect(() => {
    if (update) {
      const listEl = listRef.current.getBoundingClientRect();
      const cardSize = listEl.width / products.length;
      const maxListSize = cardSize * products.length;
      const minListSize = cardSize;
      const newListSize = (cardSize * Math.floor((window.innerWidth - scrollBar - 2 * buttonWidth) / cardSize));
      const starterListSize = (newListSize > maxListSize ? maxListSize : newListSize < minListSize ? minListSize : newListSize)
      setWindowSize(window.innerWidth - scrollBar);
      // if(newListSize < minListSize) {
      //   setRightListLim(starterListSize);
      //   setLeftListLim(starterListSize);
      // }

      // setLefttSize(starterListSize + 2 * buttonWidth);
      // const starterSlots = starterListSize / cardSize;
      // setSlots(starterSlots);
      // console.log(starterListSize + 2 * buttonWidth);
      // console.log(starterSlots);
    }
    window.addEventListener('resize', determineArrowDisplay);
    return () => window.removeEventListener('resize', determineArrowDisplay);
  }, [update]);

  useEffect(() => {
    updateListCards(product_id, setProducts);
  }, [product_id]);

  const sectionHeader = (id) => (id !== undefined ? <h3>List Products</h3> : <h3>Your Outfits</h3>);

  const cardElement = (product, cards, defaultIndex, key) => (
    <ProductCard product={product} cards={cards} defaultIndex={defaultIndex} key={key} rating={product.rating} outfits={outfits} outfitsIdList={outfitsIdList} setProduct_id={setProduct_id} setOutfits={setOutfits} setOutfitsIdList={setOutfitsIdList} setUpdate={setUpdate} />
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '50px auto 50px' }}>
       {/* <LeftButton showLeftArrow={showLeftArrow} setLeftBlocks={setLeftBlocks} leftBlocks={leftBlocks} setRightBlocks={setRightBlocks} rightBlocks={rightBlocks} /> */}
      <div>
        {sectionHeader(product_id)}
        <CardList ref={listRef}>
          {product_id !== undefined ? products.slice(0, products.length).map((product) => {
            altCards = [];
            defaultIndex = populateAltCards(product, altCards);
            return cardElement(product, altCards, defaultIndex, product.id);
          }) : outfitsIdList.slice(0, outfitsIdList.length).map((id) => {
            console.log(outfits);
            const outfit = outfits[id];
            return cardElement(outfit.product, outfit.cards, outfit.defaultIndex, outfit.product.id);
          })}
        </CardList>
      </div>
      {/* <RightButton showRightArrow={showRightArrow} setRightBlocks={setRightBlocks} rightBlocks={rightBlocks} /> */}
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

// function LeftButton({showLeftButton, setRightBlocks, rigthBlocks}) {
//   return (
//     <div>{showLeftButton ? <button onClick={setRightBlocks(rigthBlocks - 1)}> Go Left</button> : <button></button>}</div>
//   )
// }
function RightButton({ showRightArrow, setRightBlocks, rightBlocks }) {
  return (
    <div>
      {showRightArrow && <button type="button" onClick={() => setRightBlocks(rightBlocks + 1)}>Whats to the rigth</button>}
    </div>
  );
}
function LeftButton({ showLeftArrow, setLeftBlocks, leftBlocks, setRightBlocks, rightBlocks }) {
  return (
    <div>
      {showLeftArrow && <button type="button" onClick={() => {setLeftBlocks(leftBlocks + 1 < 0 ? 0 : leftBlocks + 1)}}>Whats to the left</button>}
    </div>
  );
}
