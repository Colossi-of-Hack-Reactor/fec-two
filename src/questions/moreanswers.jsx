import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const More = styled.div`
font-size: 10px;
font-weight: 600;
padding-left: 5px;
  padding-top: 10px;
  padding-bottom 3px;
  grid-column-start: 2;
  grid-row-start: ${(props) => props.row};
  grid-row-end: ${(props) => props.row + 1};
`;

const MoreAnswers = function MoreAnswers({index, setNumOfAnswers, numOfAnswers}) {
  const onClick = function onClick() {
    setNumOfAnswers(numOfAnswers + 2);
  };
  // eslint-disable-next-line max-len
  return <More onClick={(e) => { e.preventDefault(); onClick(); }} row={index * 2 + 1}>ShowMoreAnswers</More>;
};

export default MoreAnswers;
