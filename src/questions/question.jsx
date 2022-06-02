import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AnswerList from "./answer.jsx";
import Helpful from "./helpful.jsx";
import AddAnswer from "./addanswer.jsx";

const QuestionLine = styled.div.attrs((props) => ({
  row: props.row,
}))`
  padding-top: 10px;
  font-size: 18px;
  font-weight: 700;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: ${(props) => props.row};
  grid-row-end: ${(props) => props.row + 1};
`;

const Question = function Question({
  info,
  index,
  answersToDisplay,
  setAnswersToDisplay,
  sorted,
}) {
  const [answersNum, setAnswersNum] = useState(2);

  return (
    <>
      <QuestionLine row={index + 1}>
        Q:
        {" " + info.question_body}
        <AnswerList
          answersToDisplay={answersToDisplay}
          setAnswersToDisplay={setAnswersToDisplay}
          info={info.answers}
        />
      </QuestionLine>
      <Helpful index={index} info={info} />
      <AddAnswer index={index} info={info} />
    </>
  );
};

export default Question;
