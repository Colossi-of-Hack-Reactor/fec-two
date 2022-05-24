import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Question from "./question.jsx";
import axios from "axios";

const QAList = function QAList(props) {
  const { product_id, setProduct_id, setLoading } = props;
  const [qainfo, setQainfo] = useState([]);
  const [questionsToDisplay, setQuestionsToDisplay] = useState(2);

  useEffect(() => {
    setLoading((a) => a + 1);
    axios
      .get(`http://localhost:3001/qa?questionID=${product_id}`)
      .then((res) => {
        setQainfo(res.data.results);
        setLoading((a) => a - 1);
      })
      .catch((err) => {
        console.log("axios get products error", err);
        setLoading((a) => a - 1);
      });
  }, [product_id]);

  console.log(qainfo);
  return (
    <div id="QADuplex">
      {qainfo.map((current, index) => {
        if (index < questionsToDisplay) {
          return <Question info={current} key={current.question_id} />;
        }
      })}

    </div>
  );
};

export default QAList;
