import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HelpfulVote from './helpfulvote.jsx';
const HelpfulDiv = styled.div.attrs((props) => ({
  row: props.row,
}))`
display: grid;
grid-template-columns: 5fr 2fr 4fr;
  padding-top: 0px;
  padding-right: 6px;
  font-size: 12px;
  font-weight: 100;
  text-align: right;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: ${(props) => props.row};
  grid-row-end: ${(props) => props.row + 1};
`;
const Word = styled.div`
padding-right: 3px;
padding-top: 10px;
font-size: 12px;
font-weight: 100;
grid-column-start: 1;
text-align: right;
`;
const Votes = styled.div`
padding-top: 10px;
font-size: 12px;
font-weight: 100;
grid-column-start: 3;
text-align: center;
`;

const Helpful = function Helpful({ info, index }) {
  const [helpfulness, setHelpfulness] = useState(info.question_helpfulness);
  return (
    <HelpfulDiv row={index + 1}>
      <Word>Helpful?</Word>
      <HelpfulVote info = {info} addHelpful = {setHelpfulness} helpfulness ={helpfulness}/>
      <Votes>{'(' + helpfulness + ')' }</Votes>
    </HelpfulDiv>
  );
};
export default Helpful;
