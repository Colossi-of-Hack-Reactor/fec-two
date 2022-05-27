import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const NameDiv3 = styled.div`
grid-column-start: 5;
font-size: 12px;
font-weight: 200;
`;

const ReportAnswer = function ReportAnswer({ info }) {
  const [ReportedState, setReportedState] = useState(false);
  const onReportClick = () => {
    console.log('clicked');
    axios.put(`http://localhost:3001/qa/answers/${info.id}/helpful`)
      .then(() => {
        setHelpfulness(helpfulness + 1);
      })
      .catch((err) => {
        console.log("Error sending helpful vote", err);
      });
  };

  return (
    <NameDiv3 className = 'reportAnswer'
      onClick={(event) => {
        event.preventDefault();
        onReportClick();
      }}
    >
      Report Answer
    </NameDiv3>
  );
};

export default ReportAnswer;
