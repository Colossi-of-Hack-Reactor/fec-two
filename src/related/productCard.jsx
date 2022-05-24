/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
const SlimDiv = styled.div`
  display: inline-block;
  block-size: fit-content
  `;
const Productcard = ({ product = {}, cards = [], defaultIndex }) => {
  const [index, setIndex] = useState(defaultIndex);
  useEffect((newIndex) => {
    setIndex(newIndex || defaultIndex);
  }, ([index]));

  const totalStyles = cards.length;
  const allStyles = cards.reduce((memo, card, i) => (i !== cards.length - 1 ? `${memo} ${card.style_name},` : `${memo} ${card.style_name}.`), '');

  return (
    <SlimDiv>
      <div>ActionButton and image are in same div</div>
      <img alt={index !== undefined ? `${cards[index].style_name}, category is ${cards[index].category}` : `Sorry, no physical description is available for this item. Product category is ${product.category} and comes in the following styles: ${allStyles}`} src={(index !== undefined && cards[index].photos[0].thumbnail_url) ? cards[index].photos[0].thumbnail_url : '/assets/android-chrome-192x192.png'} />
      <br />
      {product.name}
      <br />
      {product.category}
      <br />
      {index !== undefined ? cards[index].original_price : product.default_price}
      <br />
      Ratings go here
    </SlimDiv>
  );
};

export default Productcard;
