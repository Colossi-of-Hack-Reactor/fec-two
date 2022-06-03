import React, { useState, useEffect } from "react";
import styled from "styled-components";
import QuestionModal from "./questionmodal.jsx";
import ShowLessQuestions from "./showlessquestions.jsx";

const Wrap = styled.div`
display: grid;
grid-template-columns: 200px 200px 200px;
margin-top: 70px;
gap: 30px;
`;
const AddQuestion = styled.button`
background-color: WhiteSmoke;
color: Black;
padding: 6px 6px;
font-size: 18px;
font-family: Arial, Helvetica Neue Thin, sans-serif;
border: none;
box-shadow: 0px 0px 6px 6px rgba(0,0,0, .2);
cursor: pointer;
`;
const MoreQ = styled.button`
background-color: WhiteSmoke;
color: Black;
padding: 26px 6px;
font-size: 18px;
font-family: Arial, Helvetica Neue Thin, sans-serif;
border: none;
box-shadow: 0px 0px 6px 6px rgba(0,0,0, .2);
cursor: pointer;
`;

const QAButtons = function QAButtons({
  questionsToDisplay,
  setQuestionsToDisplay,
  qainfo,
  product_id,
}) {
  const [showQ, setShowQ] = useState(false);
  const [showLess, setShowLess] = useState(false);
  return (
    <Wrap>
      <MoreQ
        data-testid="moreQ"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setQuestionsToDisplay(questionsToDisplay + 2);
          setShowLess(true);
        }}
      >
        More Answered Questions
      </MoreQ>
      <AddQuestion
        data-testid="addQuestion"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setShowQ(true);
        }}
      >
        Add a Question +
      </AddQuestion>
      <ShowLessQuestions
        data-testid="ShowLess"
        showLess={showLess}
        setShowLess={setShowLess}
        setQuestionsToDisplay={setQuestionsToDisplay}
      />
      <QuestionModal
        product_id={product_id}
        showQ={showQ}
        qainfo={qainfo}
        setShowQ={setShowQ}
      />
    </Wrap>
  );
};

export default QAButtons;
