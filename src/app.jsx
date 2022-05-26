/* eslint-disable camelcase */
import React, { useState } from 'react';
import styled from 'styled-components';
import Overview from './overview/overview.jsx';
import Related from './related/related.jsx';
import Questions from './questions/questions.jsx';
import Ratings from './ratings/ratings.jsx';

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

function App() {
  const [product_id, setProduct_id] = useState(37311);
  const [loading, setLoading] = useState(0);
  const [outfitsIdList, setOutfitsIdList] = useState([]);
  const [outfits, setOutfits] = useState({});

  return (
    <>
      {loading ? <Loading className="loading" data-testid="loading" /> : ''}
      <h1>Hello World</h1>
      <Overview
        product_id={product_id}
        setProduct_id={setProduct_id}
        setLoading={setLoading}
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
      <Related
        setProduct_id={setProduct_id}
        outfitsIdList={outfitsIdList}
        outfits={outfits}
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
      />
    </>
  );
}

export default App;
