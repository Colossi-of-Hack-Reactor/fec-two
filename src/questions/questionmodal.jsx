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

const QuestionModal = function QuestionModal({ qainfo, setShowQ, showQ, product_id }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setAnswer] = useState('');
  const [photos, setPhotos] = useState(['']);

  const handleSubmit = function handleSubmit() {
    console.log('submitted: ', name, email, body);
    axios.post('http://localhost:3001/qa/questions/', {
      body, name, email, product_id
    })
      .then(() => {
        setShowQ(false);
      })
      .catch((err) => {
        console.log("Error sending answer", err);
      });
  };

  if (showQ === false) {
    return null;
  }
  return (
    <Modal>
      <Title>Ask A Question</Title>
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
              setName(event.target.value);
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
          Your Question:
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

export default QuestionModal;