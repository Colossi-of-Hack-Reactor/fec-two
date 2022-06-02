import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const NameDiv3 = styled.div`
&:hover {
  cursor: pointer;
};
  height: fit-content;
grid-column-start: 5;
font-size: 12px;
font-weight: 200;
`;

const ReportAnswer = function ReportAnswer({ info }) {
  const [ReportedState, setReportedState] = useState(false);
  const onReportClick = () => {
    axios.put(`/qa/answers/${info.id}/report`)
      .then(() => {
        setReportedState(true);
      })
      .catch((err) => {
        console.log("Error sending helpful vote", err);
      });
  };
  if (ReportedState === true) {
    return (<NameDiv3>Reported</NameDiv3>);
  }
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
