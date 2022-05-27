import React, { useState, useEffect } from "react";
import styled from "styled-components";
const Wrap = styled.div`
  margin-top: 3%;
`;
const AddQuestion = styled.button`
  font-size: 12px;
  padding-top: 2%;
  padding-bottom: 2%;
  margin-left: 4%;
  `;
const MoreQ = styled.button`
  font-size: 12px;
  padding-top: 2%;
  padding-bottom: 2%;
`;

const QAButtons = function QAButtons({
  questionsToDisplay,
  setQuestionsToDisplay,
}) {
  return (
    <Wrap>
      <MoreQ
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setQuestionsToDisplay(questionsToDisplay + 2);
        }}
      >
        More Answered Questions
      </MoreQ>
      <AddQuestion>Add a Question +</AddQuestion>
    </Wrap>
  );
};

export default QAButtons;
