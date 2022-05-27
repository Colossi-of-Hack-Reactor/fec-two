/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import SearchBar from "./searchbar.jsx";
import QAList from "./qalist.jsx";

const QAMainDiv = styled.div`
  width: 65%;
  margin: auto;
`;

const Questions = function Questions(props) {
  const { product_id, setProduct_id, setLoading } = props;
  const [productID, setProductID] = useState(product_id);
  return (
    <QAMainDiv>
      <SearchBar setProduct_id={setProduct_id} product_id={product_id} />
      <QAList setProduct_id={setProduct_id} setLoading={setLoading} product_id={product_id}/>
    </QAMainDiv>
  );
};

export default Questions;