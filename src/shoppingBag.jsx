/* eslint-disable camelcase */
import React from 'react';
import styled from 'styled-components';
import BagItem from './bagItem.jsx';

const SidePanel = styled.div`
  position: fixed;
  height: 100%;
  width: 300px;
  top: 0;
  right: 0;
  z-index: 6;
  background-color: #e9ecef;
  transform: translateX(${(props) => (props.show ? '0px' : '400px')});
  transition: .5s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 0px 10px 10px rgba(0,0,0, .5);
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
  padding-bottom: 8px;
`;

const AnotherDiv = styled.div`
  position: relative;
`;

let closeTimeout = null;

function ShoppingBag(props) {
  const { showCart, setShowCart, cart, setCart } = props;

  let total = 0;
  cart.forEach((p) => {
    if (p.salePrice) {
      total += p.quantity * p.salePrice;
    } else {
      total += p.quantity * p.originalPrice;
    }
  });

  return (
    <SidePanel
      show={showCart}
      onMouseOver={() => {
        clearTimeout(closeTimeout);
      }}
      onMouseOut={() => {
        closeTimeout = setTimeout(() => {
          setShowCart(false);
        }, 1000);
      }}
    >
      <AnotherDiv>
        <Header>
          <h3>Your Bag</h3>
        </Header>
        {cart.map((p, i) => (
          <BagItem key={p.sku} p={p} i={i} cart={cart} setCart={setCart} />
        ))}
      </AnotherDiv>
      <Total>Total: ${total.toFixed(2)}</Total>
    </SidePanel>
  );
}

export default ShoppingBag;
