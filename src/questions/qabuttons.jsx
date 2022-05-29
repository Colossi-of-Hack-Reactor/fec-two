import React, { useState, useEffect } from "react";
import styled from "styled-components";
import QuestionModal from "./questionmodal.jsx";
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
  qainfo,
  product_id,
}) {
  const [showQ, setShowQ] = useState(false);
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
      <AddQuestion
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setShowQ(true);
        }}
      >
        Add a Question +
      </AddQuestion>
      <QuestionModal product_id={product_id} showQ={showQ} qainfo={qainfo} setShowQ={setShowQ} />
    </Wrap>
  );
};

export default QAButtons;
