import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Vote2 = styled.div`
  font-size: 12px;
  font-weight: 100;
  padding-right: 3px;
  grid-column-start: 2;
  grow-row-start: 1;
  text-decoration: underline;
`;
const Voted = styled.div`
  font-size: 12px;
  font-weight: 200;
  padding-right: 3px;
  grid-column-start: 2;
  grow-row-start: 1;

`;

const AnswerVote = function AnswerVote({ info, setHelpfulness, helpfulness }) {
  const [voted, setVoted] = useState(false);

  const onVoteClick = () => {
    axios
      .put(`http://localhost:3001/qa/answers/${info.id}/helpful`)
      .then(() => {
        setHelpfulness(helpfulness + 1);
        setVoted(true);
      })
      .catch((err) => {
        console.log("Error sending helpful vote", err);
      });
  };
  if (!voted) {
    return (
      <Vote2
        className="vote2"
        onClick={(event) => {
          event.preventDefault();
          onVoteClick();
        }}
      >
        Yes
      </Vote2>
    );
  }
  return (<Voted>Voted</Voted>)
};

export default AnswerVote;
