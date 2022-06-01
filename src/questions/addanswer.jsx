import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AnswerModal from "./answermodal.jsx";
const AddAnswerDiv = styled.div.attrs((props) => ({
  row: props.row,
}))`
&:hover {
  cursor: pointer;
};
  height: fit-content;
  text-align: right;
  padding-top: 10px;
  font-size: 12px;
  font-weight: 200;
  grid-column-start: 3;
  grid-row-start: ${(props) => props.row};

`;

const AddAnswer = function AddAnswer({ info, index }) {
  const [showAddAnswer, setShowAddAnswer] = useState(false);

  return (
    <>
      <AddAnswerDiv
        data-testid="addAnswer"
        onClick={(e) => {
          e.preventDefault();
          setShowAddAnswer(true);
        }}
        row={index + 1}
      >
        |&nbsp;&nbsp;AddAnswer
      </AddAnswerDiv>
      <AnswerModal show={showAddAnswer} questionID={info.question_id} setShow={setShowAddAnswer} />
    </>
  );
};

export default AddAnswer;
