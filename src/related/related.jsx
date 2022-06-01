/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
/* eslint-disable import/extensions */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import $ from 'jquery';
import styled from 'styled-components';
import List from './list.jsx';

function Related({
  product_id, outfitsIdList, outfits, setProduct_id, setLoading, setOutfits, setOutfitsIdList,
}) {
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
        />
      </div>
      <div style={{ width: 'fit-content' }}>
        <List
          setProduct_id={setProduct_id}
          outfitsIdList={outfitsIdList}
          outfits={outfits}
          setLoading={setLoading}
          setOutfits={setOutfits}
          setOutfitsIdList={setOutfitsIdList}
        />
      </div>
    </div>
  );
}

Related.propTypes = {
  product_id: PropTypes.number.isRequired,
  outfitsIdList: PropTypes.array.isRequired,
  outfits: PropTypes.object.isRequired,
  setProduct_id: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setOutfits: PropTypes.func.isRequired,
  setOutfitsIdList: PropTypes.func.isRequired,
};

export default Related;
