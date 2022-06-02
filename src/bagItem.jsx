/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ShoppingBagSVG } from './overview/overviewAssets.js';
import { Sale } from './overview/overviewStyled.js';

const Item = styled.div`
  padding: 8px;
  margin: 4px 8px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ProductName = styled.span`
  font-size: 22px;
  padding-bottom: 4px;
`;

const Details = styled.span`
  font-size: 14px;
`;

const Price = styled.span`
  align-self: flex-end;
`;

const Remove = styled.span`
  cursor: pointer;
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 12px;
  visibility: ${(props) => (props.vis ? 'visible' : 'hidden')};
`;

function BagItem(props) {
  const { p, i, cart, setCart } = props;
  const [showRemove, setShowRemove] = useState(false);

  return (
    <Item
      key={p.sku}
      onMouseOver={() => setShowRemove(true)}
      onMouseOut={() => setShowRemove(false)}
    >
      <ProductName>{p.productName}</ProductName>
      <Details>Style: {p.styleName}</Details>
      <Details>Size: {p.size}</Details>
      <Price>
        {p.quantity}
        {' x '}
        {p.salePrice ? (
          <Sale>
            $
            {p.salePrice}
          </Sale>
        ) : (
          <span>
            $
            {p.originalPrice}
          </span>
        )}
      </Price>
      <Remove
        onClick={() => {
          const newCart = cart.slice();
          newCart.splice(i, 1);
          setCart(newCart);
        }}
        vis={showRemove}
      >
        Remove
      </Remove>
    </Item>
  );
}

export default BagItem;
