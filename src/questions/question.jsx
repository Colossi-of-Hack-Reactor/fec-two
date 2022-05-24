import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Answer from "./answer.jsx";
import Helpful from "./helpful.jsx";
import AddAnswer from "./addanswer.jsx";

const QuestionLine = styled.div.attrs((props) => ({
  row: props.row,
}))`
  padding-top: 10px;
  font-size: 14px;
  font-weight: 700;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: ${(props) => props.row};
  grid-row-end: ${(props) => props.row + 1};
`;

// next div inside grid, column 2 row props.row
const Question = function Question({ info, setQuestions, index }) {
  const [answersNum, setAnswersNum] = useState(2);
  return (
    <>
      <QuestionLine row={index + 1}>
        Q:
        {' ' + info.question_body}
        <Answer info={info.answers} />
      </QuestionLine>
      <Helpful index={index} info={info} />
      <AddAnswer index={index} info={info} />
    </>
  );
};

export default Question;