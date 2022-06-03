/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Overview from './overview/overview.jsx';
import Related from './related/related.jsx';
import Questions from './questions/questions.jsx';
import Ratings from './ratings/ratings.jsx';
import ShoppingBag from './shoppingBag.jsx';
import Search from './search/search.jsx';
import Sales from './sales/sales.jsx';
import { ShoppingBagSVG, SearchLink } from './overview/overviewAssets.js';

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
  height: 100px;
  top: 0;
  left: 0;
  z-index: 5;
  display: flex;
  justify-content: center;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
`;

const CompanyName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;

const ShoppingBagDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  svg {
    cursor: pointer;
    fill: #e9ecef;
    height: 30px;
    width: 30px;
  }
`;

const Promos = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`;

const Badge = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 20px;
  width: 20px;
  background-color: #e9ecef;
  color: black;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SearchDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  margin-left: 16px;

`;

const SearchIcon = styled.img`

  cursor: pointer;
  height: 30px;
  width: 30px;
`;

const IconDiv = styled.div`
  display: flex;
`;

function App() {
  const [product_id, setProduct_id] = useState(37311);
  const [loading, setLoading] = useState(0);
  const [outfitsIdList, setOutfitsIdList] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [meta, setMeta] = useState({});
  const [product, setProduct] = useState({});
  const ratingsRef = React.useRef();
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [fromSale, setFromSale] = useState(false);
  const [styleID, setStyleID] = useState(null);

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
        <Sales
          setProduct_id={setProduct_id}
          fromSale={fromSale}
          setFromSale={setFromSale}
          styleID={styleID}
          setStyleID={setStyleID}
        />
        <HeaderDiv>
          <CompanyName>
            <h1>Colossus of Clothes</h1>
          </CompanyName>
          <Promos>
            <div>Free express shipping on $200+ orders for rewards members!</div>
            <div>Sign up now!</div>
          </Promos>
          <IconDiv>
            <ShoppingBagDiv>
              <ShoppingBagSVG onClick={() => setShowCart((a) => !a)} />
              {cart.length ? (
                <Badge onClick={() => setShowCart((a) => !a)}>
                  <h6>{cart.length}</h6>
                </Badge>
              ) : ''}
            </ShoppingBagDiv>
            <SearchDiv>
              <SearchIcon src={SearchLink} onClick={() => setShowSearch(true)} />
            </SearchDiv>
          </IconDiv>
        </HeaderDiv>
        <Search
          setProduct_id={setProduct_id}
          showSearch={showSearch}
          setShowSearch={setShowSearch}
        />
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
        fromSale={fromSale}
        setFromSale={setFromSale}
        styleID={styleID}
        setStyleID={setStyleID}
      />
      <Related
        product_id={product_id}
        setProduct_id={setProduct_id}
        setLoading={setLoading}
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
      <ShoppingBag showCart={showCart} setShowCart={setShowCart} cart={cart} setCart={setCart} />
    </>
  );
}

export default App;
