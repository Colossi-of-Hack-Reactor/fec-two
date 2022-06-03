import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SalesBanner = styled.div`
  position: absolute;
  background-color: #333;
  color: white;
  width: 100%;
  height: 22px;
  top: ${(props) => (props.show ? '0' : '-25px')};
  left: 0;
  z-index: 6;
  display: flex;
  justify-content: center;
  transition: top 0.5s;

`;

const SalesDiv = styled.div`

  width: 95%;
`;

const SaleSpan = styled.span`
  margin-left: 6px;

`;

const SalePrice = styled.span`
  margin-left: 6px;
  color: red;
  font-weight: 700;

`;
const OriginalPrice = styled.span`
  margin-left: 8px;
  text-decoration: line-through;
  text-decoration-style: solid;

`;

const SalesClick = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

let lastScrollTop;

function Sales(props) {
  const [randomSale, setRandomSale] = useState({});
  const [timer, setTimer] = useState(0);
  const { setProduct_id, fromSale, setFromSale, styleID, setStyleID } = props;
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    axios.get(`/randomSale`)
      .then((response) => {
        setRandomSale(response.data);
        setTimeout(() => {
          setTimer((t) => (t + 1));
        }, 10000);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [timer]);

  useEffect(() => {
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setShowBanner(false);
      } else {
        setShowBanner(true);
      };
      lastScrollTop = scrollTop;
    })
  }, []);

  return (
    <SalesBanner show={showBanner}>
      <SalesDiv>
        <SalesClick onClick={() => { setFromSale(true); setStyleID(randomSale.style_id); setProduct_id(randomSale.product_id); }}>
          <SaleSpan>On Sale!</SaleSpan>
          <SaleSpan>{randomSale.product_name}</SaleSpan>
          <SaleSpan>-</SaleSpan>
          <SaleSpan>{randomSale.style_name}</SaleSpan>
          <SalePrice>${randomSale.sale_price}</SalePrice>
          <OriginalPrice>${randomSale.original_price}</OriginalPrice>
        </SalesClick>
      </SalesDiv>
    </SalesBanner>
  );
}

export default Sales;
