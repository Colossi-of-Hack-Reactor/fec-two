import React, { useState, useEffect } from "react";
import styled from "styled-components";

const AddAnswerDiv = styled.div.attrs((props) => ({
  row: props.row,
}))`
  padding-top: 10px;
  font-size: 12px;
  font-weight: 700;
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: ${(props) => props.row};
  grid-row-end: ${(props) => props.row + 1};
`;

const AddAnswer = function AddAnswer({ info, index }) {
  return (
    <AddAnswerDiv row={index + 1}>AddAnswer Here</AddAnswerDiv>
  );
};

export default AddAnswer;