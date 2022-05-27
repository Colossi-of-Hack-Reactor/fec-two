import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AnswerVote from "./answervote.jsx";

const HelpfulDiv2 = styled.div.attrs((props) => ({
  row: props.row,
}))`
  display: grid;
  grid-template-columns: max-content max-content max-content;
  padding-top: 0px;
  font-size: 10px;
  font-weight: 100;
  grid-column-start: 3;
  grid-row-start: 1;
`;
const Word2 = styled.div`
  font-size: 10px;
  font-weight: 100;
  grid-column-start: 1;
  padding-right: 3px;
`;
const Votes2 = styled.div`
  font-size: 10px;
  font-weight: 100;
  grid-column-start: 3;
  padding-right:
`;

const HelpfulAnswer = function HelpfulAnswer({ info, index }) {
  const [helpfulness, setHelpfulness] = useState(info.helpfulness);
  return (
    <HelpfulDiv2 row={index + 1}>
      <Word2>Helpful?</Word2>
      <AnswerVote info={info} setHelpfulness={setHelpfulness} helpfulness = {helpfulness} />
      <Votes2>{"(" + helpfulness + ")"}</Votes2>
    </HelpfulDiv2>
  );
};

export default HelpfulAnswer;
