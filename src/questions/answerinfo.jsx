import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NameDate from "./namedate.jsx";
import ReportAnswer from "./reportanswer.jsx";
import HelpfulAnswer from "./helpfulanswer.jsx";

const AnswerInfoBlock = styled.div.attrs((props) => ({
  row: props.row,
}))`
  display: grid;
  grid-template-columns: max-content max-content max-content max-content max-content;
  padding-left: 3px;
  padding-top: 5px;
  padding-bottom 3px;
  grid-column-start: 2;
  grid-row-start: ${(props) => props.row};
  grid-row-end: ${(props) => props.row + 1};
`;
const SlashOne = styled.div`
grid-column-start: 2;
padding-left: 8px;
padding-right: 8px;
font-size: 10px;
  font-weight: 200;
`;
const SlashTwo = styled.div`
grid-column-start: 4;
padding-left: 8px;
padding-right: 8px;
font-size: 10px;
  font-weight: 200;
`;
const AnswerInfo = function AnswerInfo({row, info}) {
  console.log(info);
  return (
  <AnswerInfoBlock row={row}>
    <NameDate info={info} />
    <SlashOne>|</SlashOne>
    <HelpfulAnswer info={info} />
    <SlashTwo>|</SlashTwo>
    <ReportAnswer info={info} />
  </AnswerInfoBlock>
  );
};

export default AnswerInfo;
