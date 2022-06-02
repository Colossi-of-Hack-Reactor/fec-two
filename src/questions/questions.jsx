/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import QAList from "./qalist.jsx";

const QAMainDiv = styled.div`

`;

const Questions = function Questions(props) {
  const { product_id, setProduct_id, setLoading } = props;
  const [productID, setProductID] = useState(product_id);
  return (
    <QAMainDiv className="questions">
      <QAList setProduct_id={setProduct_id} setLoading={setLoading} product_id={product_id}/>
    </QAMainDiv>
  );
};

export default Questions;
