import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AnswerBlock from './answerblock.jsx';

const AnswerGrid = styled.div`

width: 70%;
display: grid;
grid-template-columns: 16px 1fr;
grid-template-rows: auto;
`;

const NoAnswers = styled.div`
padding-left: 2px;
padding-top: 11px;
font-size: 10px;
font-weight: 200;
padding-bottom 6px;
grid-column-start: 2;
`;
const AnswerList = function Answer({
  info,
  answersToDisplay,
  setAnswersToDisplay,
}) {
  const createAnswersArr = function (obj) {
    const result = Object.values(info);
    result.sort((a, b) => b.helpfulness - a.helpfulness);
    return result;
  };
  // map answer block
  const sortedAnswers = createAnswersArr(info);

  let noAnswers = false;
  if (Object.keys(info).length === 0) {
    noAnswers = true;
  }
  if (noAnswers) {
    return (
      <AnswerGrid>
        <NoAnswers>
          No answers yet! Be the first to Answer!
        </NoAnswers>
      </AnswerGrid>
    );
  }
  return (
    <AnswerGrid>
      {sortedAnswers.map((answer, index) => {
        if (index < answersToDisplay) {
          return <AnswerBlock key={answer.id} info={answer} index={index} />;
        }
      })}
    </AnswerGrid>
  );
};

export default AnswerList;
