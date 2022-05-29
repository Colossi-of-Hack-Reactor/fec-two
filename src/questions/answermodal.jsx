import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
const Modal = styled.div`
  position: fixed;

  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin-top: 22%;
  margin-right: 25%;
  margin-left: 25%;
  margin-bottom: 22%;
  background-color: grey;
  display: grid;
  grid-template-rows: 15%;
  opacity: 500;
  transition: all 1s ease-in-out;
`;

const Title = styled.h3`
  grid-row-start: 0;
  text-align: center;
`;

const AnswerForm = styled.form`
  padding-top: 5%;
  margin-left: 15%;
`;

const AnswerModal = function AnswerModal({ show, questionID, setShow }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setAnswer] = useState('');
  const [photos, setPhotos] = useState(['']);
  const handleNameChange = function handleNameChange(e) {
    setName(e);
  };

  const handleSubmit = function() {
    axios.post(`http://localhost:3001/qa/questions/${questionID}/answers`, { body, name, email, photos })
      .then((res) => {
        setShow(false);
      })
      .catch((err) => {
        console.log("Error sending answer", err);
      });
  }

  if (show === false) {
    return null;
  }
  return (
    <Modal>
      <Title>Add An Answer</Title>
      <AnswerForm
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <label>
          Enter your name:
          <input
            type="text"
            onChange={(event) => {
              event.preventDefault();
              handleNameChange(event.target.value);
            }}
          />
        </label>
        <br />
        <br />
        <label>
          Enter your email:
          <input
            type="email"
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
          />
        </label>
        <br />
        <br />
        <label>
          Your Answer:
          <br />
          <textarea
            type="text"
            cols="40"
            rows="5"
            onChange={(e) => {
              e.preventDefault();
              setAnswer(e.target.value);
            }}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </AnswerForm>
    </Modal>
  );
};

export default AnswerModal;
