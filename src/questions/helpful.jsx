

import React, { useState, useEffect } from "react";
import styled from "styled-components";

const HelpfulDiv = styled.div.attrs((props) => ({
  row: props.row,
}))`
  padding-top: 10px;
  font-size: 12px;
  font-weight: 200;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: ${(props) => props.row};
  grid-row-end: ${(props) => props.row + 1};
`;

const Helpful = function Helpful({ info, index }) {
  return (
    <HelpfulDiv row={index+1}>Helpful Here</HelpfulDiv>
  );
};
export default Helpful;