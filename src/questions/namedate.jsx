import React, { useState, useEffect } from "react";
import styled from "styled-components";

const NameDiv = styled.div`
grid-column-start: 1;
font-size: 10px;
  font-weight: 200;
`;

const NameDate = function NameDate({ info }) {
  let name = info.answerer_name;
  let date = new Date(info.date)
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  date = date.toLocaleDateString('en-us', options)
  return (<NameDiv>by {name}, {date}</NameDiv>);
};

export default NameDate;
