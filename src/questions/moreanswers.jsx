import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const More = styled.div`
&:hover {
  cursor: pointer;
};
  height: fit-content;
font-size: 14px;
font-weight: 600;
padding-left: 5px;
  padding-top: 10px;
  padding-bottom 3px;
  grid-column-start: 2;
  grid-row-start: ${(props) => props.row};
  grid-row-end: ${(props) => props.row + 1};
`;

const MoreAnswers = function MoreAnswers({index, setNumOfAnswers, info}) {
  const onClick = function onClick() {
    setNumOfAnswers(Object.keys(info).length);
  };
  // eslint-disable-next-line max-len
  return <More onClick={(e) => { e.preventDefault(); onClick(); }} row={index * 2 + 1}>Show More Answers</More>;
};

export default MoreAnswers;
