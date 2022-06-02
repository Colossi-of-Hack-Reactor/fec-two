/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Overview from './overview/overview.jsx';
import Related from './related/related.jsx';
import Questions from './questions/questions.jsx';
import Ratings from './ratings/ratings.jsx';
import ShoppingBag from './shoppingBag.jsx';
import { ShoppingBagSVG } from './overview/overviewAssets.js';

const Loading = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  cursor: wait;
`;

const Header = styled.div`
  position: fixed;
  background-color: black;
  color: #e9ecef;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 5;
  display: flex;
  justify-content: center;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1000px;
  width: 100%;
`;

const CompanyName = styled.h1`

`;

const ShoppingBagDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  svg {
    fill: #e9ecef;
    height: 30px;
    width: 30px;
  }
`;

function App() {
  const [product_id, setProduct_id] = useState(37311);
  const [loading, setLoading] = useState(0);
  const [outfitsIdList, setOutfitsIdList] = useState([]);
  const [outfits, setOutfits] = useState({});
  const [reviews, setReviews] = useState([]);
  const [meta, setMeta] = useState({});
  const [product, setProduct] = useState({});
  const ratingsRef = React.useRef();
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    function handleInteraction(e) {
      let node = e.target;
      let widget = 'Other';
      while (node.parentNode !== null) {
        if (/Overview/.test(node.className)) {
          widget = 'Overview';
          break;
        } else if (/Related/.test(node.className)) {
          widget = 'Related';
          break;
        } else if (/Questions/.test(node.className)) {
          widget = 'Questions';
          break;
        } else if (/Ratings/.test(node.className)) {
          widget = 'Ratings';
          break;
        }
        node = node.parentNode;
      }
      axios.post('/interactions', {
        element: e.target.outerHTML,
        widget,
        time: Date(),
      })
        .catch((err) => {
          console.log('axios post interactions error', err);
        });
    }
    window.addEventListener('click', handleInteraction);
    return () => window.removeEventListener('click', handleInteraction);
  }, []);

  return (
    <>
      {loading ? <Loading className="loading" data-testid="loading" /> : ''}
      <Header>
        <HeaderDiv>
          <CompanyName>
            Colossus of Clothes
          </CompanyName>
          <ShoppingBagDiv onClick={() => setShowCart((a) => !a)}>
            <ShoppingBagSVG />
          </ShoppingBagDiv>
        </HeaderDiv>
      </Header>
      <Overview
        product_id={product_id}
        setProduct_id={setProduct_id}
        setLoading={setLoading}
        outfitsIdList={outfitsIdList}
        setOutfitsIdList={setOutfitsIdList}
        reviews={reviews}
        meta={meta}
        ratingsRef={ratingsRef}
        product={product}
        setProduct={setProduct}
        cart={cart}
        setCart={setCart}
      />
      <Related
        product_id={product_id}
        outfitsIdList={outfitsIdList}
        outfits={outfits}
        setProduct_id={setProduct_id}
        setLoading={setLoading}
        setOutfits={setOutfits}
        setOutfitsIdList={setOutfitsIdList}
      />
      <Questions
        product_id={product_id}
        setProduct_id={setProduct_id}
        setLoading={setLoading}
      />
      <Ratings
        product_id={product_id}
        setProduct_id={setProduct_id}
        setLoading={setLoading}
        reviews={reviews}
        setReviews={setReviews}
        meta={meta}
        setMeta={setMeta}
        ratingsRef={ratingsRef}
        product={product}
      />
      <ShoppingBag show={showCart} cart={cart} setCart={setCart} />
    </>
  );
}

export default App;
