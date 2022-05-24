import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Form = styled.form`
  padding-bottom: 7px;
`;
const Title = styled.p`
  font-family: Sans-serif;
  font-weight: 100;
  font-size: 14px;
  padding-bottom: 2px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 30px;
  ::placeholder {
    opacity: 1;
    color: black;
    font-weight: 500;
    font-size: 13px;
  }
`;

const SearchBar = function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = function handleChange(input) {
    setSearchTerm(input);
  };

  const handleSubmit = (event) => {
    // 👇️ prevent page refresh
    event.preventDefault();
  };
  return (
    <div className="questionSearch">
      <Form onSubmit={handleSubmit}>
        <Title className="searchbartitle">QUESTIONS & ANSWERS </Title>
        <SearchInput
          id="questionSearchForm"
          type="text"
          value={searchTerm}
          onChange={(event) => {
            event.preventDefault();
            handleChange(event.target.value);
          }}
          placeholder=" HAVE A QUESTION? SEARCH FOR ANSWERS ... 🔍"
        />
      </Form>
    </div>
  );
};

export default SearchBar;
