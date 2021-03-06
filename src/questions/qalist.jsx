/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Question from "./question.jsx";
import axios from "axios";
import QAButtons from "./qabuttons.jsx";
import SearchBar from "./searchbar.jsx";

const Qbox = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content min-content;
  grid-template-rows: 1fr;
`;

const NoQuestions = styled.div`
  grid-column-start: 2;
`;

const QAList = function QAList(props) {
  const { product_id, setLoading } = props;
  const [qainfo, setQainfo] = useState([]);
  const [questionsToDisplay, setQuestionsToDisplay] = useState(4);
  const [answersToDisplay, setAnswersToDisplay] = useState(2);
  const [sorted, setSorted] = useState([]);
  useEffect(() => {
    setLoading((a) => a + 1);
    axios
      .get(`/qa?questionID=${product_id}`)
      .then((res) => {
        let results = res.data.results;
        results.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
        setSorted(JSON.parse(JSON.stringify(results)));
        setQainfo(results);
        setLoading((a) => a - 1);
        setAnswersToDisplay(2);
        setQuestionsToDisplay(4);
      })
      .catch((err) => {
        console.log("axios get products error", err);
        setLoading((a) => a - 1);
      });
  }, [product_id]);
  return (
    <div className="mainQA">
      <SearchBar
        qainfo={qainfo}
        setQainfo={setQainfo}
        setQuestionsToDisplay={setQuestionsToDisplay}
        sorted={sorted}
        setSorted={setSorted}
      />
      <Qbox>
        {sorted.map((current, index) => {
          if (index < questionsToDisplay) {
            return (
              <Question
                sorted={sorted}
                info={current}
                key={current.question_id}
                numOFQuestions={questionsToDisplay}
                index={index}
                answersToDisplay={answersToDisplay}
                setAnswersToDisplay={setAnswersToDisplay}
              />
            );
          }
        })}
        <QAButtons
          setQuestionsToDisplay={setQuestionsToDisplay}
          questionsToDisplay={questionsToDisplay}
          qainfo={qainfo}
          product_id={product_id}
        />
      </Qbox>
    </div>
  );
};

export default QAList;
