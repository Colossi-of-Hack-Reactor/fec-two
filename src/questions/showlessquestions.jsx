import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ShowLessButton = styled.button`
  font-size: 14px;
  padding-top: 2%;
  padding-bottom: 2%;
  margin-left: 4%;
`;

const ShowLessQuestions = function ShowLessQuestions({
  setQuestionsToDisplay,
  showLess,
  setShowLess,
}) {
  if (showLess === true) {
    return (
      <ShowLessButton
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setQuestionsToDisplay(4);
          setShowLess(false);
        }}
      >
        Show Less Questions
      </ShowLessButton>
    );
  }
};

export default ShowLessQuestions;
