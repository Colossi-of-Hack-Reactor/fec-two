import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Vote2 = styled.div`
  font-size: 10px;
  font-weight: 100;
  padding-right: 3px;
  grid-column-start: 2;
  grow-row-start: 1;
  text-decoration: underline;
`;

const AnswerVote = function AnswerVote({ info, setHelpfulness, helpfulness }) {
  const onVoteClick = () => {
    axios.put(`http://localhost:3001/qa/answers/${info.id}/helpful`)
      .then(() => {
        setHelpfulness(helpfulness + 1);
      })
      .catch((err) => {
        console.log("Error sending helpful vote", err);
      });
  };

  return (
    <Vote2 className = 'vote2'
      onClick={(event) => {
        event.preventDefault();
        onVoteClick();
      }}
    >
      Yes
    </Vote2>
  );
};

export default AnswerVote;