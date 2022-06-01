import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AnswerBlock from "./answerblock.jsx";
import MoreAnswers from "./moreanswers.jsx";
import LessAnswers from "./lessanswers.jsx";

const AnswerGrid = styled.div`
  max-height: 50vh;
  overflow-y: scroll;
  width: 70%;
  display: grid;
  grid-template-columns: 16px 1fr;
  grid-template-rows: auto;
`;

const NoAnswers = styled.div`
padding-left: 6px;
padding-top: 11px;
font-size: 14px;
font-weight: 200;
padding-bottom 6px;
grid-column-start: 2;
`;
const AnswerList = function AnswerList({ info, answersToDisplay }) {
  const [numOfAnswers, setNumOfAnswers] = useState(answersToDisplay);
  let addLess = false;
  const result = Object.values(info);

  const sortedAnswers = result.sort((a, b) => b.helpfulness - a.helpfulness);
  let noAnswers = false;
  if (Object.keys(info).length === 0) {
    noAnswers = true;
  }
  if (noAnswers) {
    return (
      <AnswerGrid>
        <NoAnswers>No answers yet! Be the first to Answer!</NoAnswers>
      </AnswerGrid>
    );
  }
  return (
    <AnswerGrid>
      {sortedAnswers.map((answer, index) => {
        if (index < numOfAnswers) {
          if (index === numOfAnswers - 1 && numOfAnswers > 2) {
            addLess = true;
          }
          return (
            <AnswerBlock
              setNumOfAnswers={setNumOfAnswers}
              addLess={addLess}
              key={answer.id}
              info={answer}
              index={index}
            />
          );
        }
        if (index === numOfAnswers) {
          return (
            <MoreAnswers
              info={info}
              key={answer.id}
              index={index}
              numOfAnswers={numOfAnswers}
              setNumOfAnswers={setNumOfAnswers}
            />
          );
        }
      })}
    </AnswerGrid>
  );
};

export default AnswerList;
