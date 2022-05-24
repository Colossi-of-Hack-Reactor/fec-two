import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Answer from "./answer.jsx";

const Question = function Question(props) {
  return (
    <div>
    <div>{props.info.question_body}</div>
      <Answer info={props.info.answers} />
    </div>
  );
}

export default Question;
