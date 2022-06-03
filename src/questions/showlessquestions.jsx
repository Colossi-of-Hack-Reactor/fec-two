import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ShowLessButton = styled.button`
background-color: WhiteSmoke;
color: Black;
padding: 26px 6px;
font-size: 18px;
font-family: Arial, Helvetica Neue Thin, sans-serif;
border: none;
box-shadow: 0px 0px 6px 6px rgba(0,0,0, .2);
cursor: pointer;
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
