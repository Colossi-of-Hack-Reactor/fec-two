import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const More2 = styled.div.attrs((props) => ({
  row: props.row,
}))`
&:hover {
  cursor: pointer;
};
  height: fit-content;
font-size: 10px;
font-weight: 600;
padding-left: 5px;
  padding-top: 10px;
  padding-bottom 3px;
  grid-column-start: 2;
  grid-row-start: auto;
`;

const LessAnswers = function LessAnswers({index, setNumOfAnswers, numOfAnswers, info}) {

  // eslint-disable-next-line max-len
  return <More2 data-testid="ShowLess" onClick={(e) => { e.preventDefault(); setNumOfAnswers(2); }} row={index * 2 + 4}>Show Less Answers</More2>;
};

export default LessAnswers;
