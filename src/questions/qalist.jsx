/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Question from "./question.jsx";
import axios from "axios";
import QAButtons from './qabuttons.jsx';

const Qbox = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content min-content;
  grid-template-rows: 1fr;
`;

const QAList = function QAList(props) {
  const { product_id, setProduct_id, setLoading } = props;
  const [qainfo, setQainfo] = useState([]);
  const [questionsToDisplay, setQuestionsToDisplay] = useState(4);
  const [answersToDisplay, setAnswersToDisplay] = useState(2);

  useEffect(() => {
    setLoading((a) => a + 1);
    axios
      .get(`http://localhost:3001/qa?questionID=${product_id}`)
      .then((res) => {
        let results = res.data.results;
        results.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
        setQainfo(results);
        setLoading((a) => a - 1);
        setAnswersToDisplay(2);
        setQuestionsToDisplay(2);
      })
      .catch((err) => {
        console.log("axios get products error", err);
        setLoading((a) => a - 1);
      });
  }, [product_id]);

  return (
    <Qbox>
      {qainfo.map((current, index) => {
        if (index < questionsToDisplay) {
          return (
            <Question
              info={current}
              key={current.question_id}
              numOFQuestions={questionsToDisplay}
              index={index}
              setQuestions={setQuestionsToDisplay}
              answersToDisplay={answersToDisplay}
              setAnswersToDisplay={setAnswersToDisplay}
            />
          );
        }
      })}
      <QAButtons setQuestionsToDisplay={setQuestionsToDisplay} questionsToDisplay={questionsToDisplay} qainfo={qainfo} product_id={product_id}/>
    </Qbox>
  );
};

export default QAList;
