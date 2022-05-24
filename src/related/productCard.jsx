/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';

const Productcards = ({ product, cards, totalStyles, defaultIndex }) => {
  console.log(product)
  const [index, setIndex] = useState(defaultIndex);
  useEffect(() => {
    setIndex(defaultIndex);
  }, ([]));
  return (
    <div>
      <div>ActionButton and image are in same div</div>
      <img alt="" src="/assets/android-chrome-192x192.png" />
      <br />
      {product.name}
      <br />
      {product.category}
      <br />
      {index ? cards[index].original_price : product.default_price}
      <br />
      Ratings go here
    </div>
  );
};

export default Productcards;
