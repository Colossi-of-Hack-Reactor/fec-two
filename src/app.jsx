/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Bot from './bot/bot.jsx';

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
  cursor: pointer;
  position: relative;
  svg {
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
`;

function App() {
  return (
    <Bot />
  );
}

export default App;
