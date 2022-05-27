import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AnswerInfo from "./answerinfo.jsx";
const AMark = styled.div.attrs((props) => ({
  row: props.row,
}))`
  padding-top: 10px;
  font-size: 14px;
  font-weight: 700;
  grid-column-start: 1;
  grid-row-start: ${(props) => props.row};;
`;
const AnswerLine = styled.div.attrs((props) => ({
  row: props.row,
}))`
  padding-top: 11px;
  font-size: 12px;
  font-weight: 200;
  padding-bottom 6px;
  grid-column-start: 2;
  grid-row-start: ${(props) => props.row};
  grid-row-end: ${(props) => props.row + 1};
`;

const AnswerBlock = function AnswerBlock({ info, index, noAnswers }) {
  console.log(info);
  let rownum = 0;
  const answerBody = info.body;
  if (index === 0) { rownum = 1; }
  if (index > 0) { rownum = index * 2 + 1; }

  return (
    <>
      <AMark row={rownum}>A:</AMark>
      <AnswerLine row={rownum}> &nbsp;{answerBody}</AnswerLine>
      <AnswerInfo row={rownum + 1} info={info} />
    </>
  );
};

export default AnswerBlock;
