/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
/* eslint-disable import/extensions */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import List from './list.jsx';

function Related({
  product_id, setProduct_id, setLoading,
}) {
  const [outfitsIdList, setOutfitsIdList] = useState([]);
  const [outfits, setOutfits] = useState({});
  const [productsOutfits, setProductsOutfits] = useState([]);
  const [productsRelated, setProductsRelated] = useState([]);
  return (
    <div>
      <div style={{ width: 'fit-content' }}>
        <List
          product_id={product_id}
          outfitsIdList={outfitsIdList}
          outfits={outfits}
          setProduct_id={setProduct_id}
          setLoading={setLoading}
          setOutfits={setOutfits}
          setOutfitsIdList={setOutfitsIdList}
          related={true}
        />
      </div>
      <div style={{ width: 'fit-content' }}>
        <List
          product_id={product_id}
          setProduct_id={setProduct_id}
          outfitsIdList={outfitsIdList}
          outfits={outfits}
          setLoading={setLoading}
          setOutfits={setOutfits}
          setOutfitsIdList={setOutfitsIdList}
          related={false}
        />
      </div>
    </div>
  );
}

Related.propTypes = {
  product_id: PropTypes.number.isRequired,
  setProduct_id: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default Related;
