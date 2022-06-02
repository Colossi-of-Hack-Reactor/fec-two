/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ShoppingBagSVG } from './overview/overviewAssets.js';
import { Sale } from './overview/overviewStyled.js';
import BagItem from './bagItem.jsx';

const SidePanel = styled.div`
  position: fixed;
  height: 100%;
  width: 300px;
  top: 0;
  right: 0;
  z-index: 6;
  border-left: 2px solid black;
  background-color: #e9ecef;
  transform: translateX(${(props) => (props.show ? '0px' : '305px')});
  transition: .5s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.span`
  display: flex;
  justify-content: center;
`;

const Total = styled.span`
  font-size: 24px;
  display: flex;
  justify-content: flex-end;
  padding-right: 8px;
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
  top: 0;
  right: 4px;
`;

function ShoppingBag(props) {
  const { show, cart, setCart } = props;

  let total = 0;
  cart.forEach((p) => {
    if (p.salePrice) {
      total += p.quantity * p.salePrice;
    } else {
      total += p.quantity * p.originalPrice;
    }
  });

  return (
    <SidePanel show={show}>
      <div>
        <Header>
          <h2>Your Bag</h2>
        </Header>
        {cart.map((p, i) => (
          <BagItem key={p.sku} p={p} i={i} cart={cart} setCart={setCart} />
        ))}
      </div>
      <Total>Total: ${total.toFixed(2)}</Total>
    </SidePanel>
  );
}

export default ShoppingBag;
