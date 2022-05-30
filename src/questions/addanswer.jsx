import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AnswerModal from "./answermodal.jsx";
const AddAnswerDiv = styled.div.attrs((props) => ({
  row: props.row,
}))`
  text-align: right;
  padding-top: 10px;
  font-size: 12px;
  font-weight: 200;
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: ${(props) => props.row};
  grid-row-end: ${(props) => props.row + 1};
`;

const AddAnswer = function AddAnswer({ info, index }) {
  const [showAddAnswer, setShowAddAnswer] = useState(false);
  const showAnswerModal = function showAnswerModal() {
    setShowAddAnswer(true);
  };
  return (
    <>
      <AddAnswerDiv
        onClick={(e) => {
          e.preventDefault();
          showAnswerModal();
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
