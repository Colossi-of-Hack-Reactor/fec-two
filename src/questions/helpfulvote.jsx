import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Vote = styled.div`
  padding-top: 10px;
  padding-right: 3px;
  font-size: 12px;
  font-weight: 100;
  grid-column-start: 2;
  text-decoration: underline;
  text-align: right;
`;

const HelpfulVote = function HelpfulVote({ info, addHelpful, helpfulness}) {
  const onVoteClick = () => {
    axios.put(`http://localhost:3001/qa/questions/${info.question_id}/helpful`)
      .then(() => {
        addHelpful(helpfulness + 1)
      })
      .catch((err) => {
        console.log("Error sending helpful vote", err);
      });
  };

  return (
    <Vote
      onClick={(event) => {
        event.preventDefault();
        onVoteClick();
      }}
    >
      Yes
    </Vote>
  );
};

export default HelpfulVote;
