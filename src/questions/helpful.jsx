import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HelpfulVote from './helpfulvote.jsx';
const HelpfulDiv = styled.div.attrs((props) => ({
  row: props.row,
}))`
display: grid;
grid-template-columns: 5fr 2fr 4fr;
  padding-top: 2px;
  font-size: 10px;
  font-weight: 100;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: ${(props) => props.row};
  grid-row-end: ${(props) => props.row + 1};
`;
const Word = styled.div`
padding-right: 0px;
padding-top: 10px;
font-size: 10px;
font-weight: 100;
grid-column-start: 1;
`;
const Votes = styled.div`
padding-right: 0px;
padding-top: 10px;
font-size: 10px;
font-weight: 100;
grid-column-start: 3;
`;

const Helpful = function Helpful({ info, index }) {
  console.log(info);
  return (
    <HelpfulDiv row={index + 1}>
      <Word>Helpful?</Word>
      <HelpfulVote />
      <Votes>{'(' + info.question_helpfulness + ')'}</Votes>
    </HelpfulDiv>
  );
};
export default Helpful;
