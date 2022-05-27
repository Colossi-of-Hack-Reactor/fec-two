import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Title = styled.p`
  font-family: Sans-serif;
  font-weight: 100;
  font-size: 14px;
  padding-bottom: 2px;
`;
const Container = styled.span`
  display: block;
  overflow: hidden;
  padding-right: 10px;
`;
const SearchInput = styled.input`
  width: 100%;
  height: 30px;
  ::placeholder {
    font-weight: 800;
    font-size: 13px;
  }
`;

const FormHolder = styled.form`
  width: 100%;
  overflow: hidden;
`;

const SearchBar = function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = function handleChange(input) {
    setSearchTerm(input);
  };

  const handleSubmit = (event) => {
    // 👇️ prevent page refresh
    event.preventDefault();

    console.log(searchTerm);
  };
  return (
    <div className="questionSearch">
      <FormHolder onSubmit={handleSubmit}>
        <Title className="searchbartitle">QUESTIONS & ANSWERS </Title>
        <Container>
          <SearchInput
            id="questionSearchForm"
            type="text"
            value={searchTerm}
            onChange={(event) => {
              event.preventDefault();
              handleChange(event.target.value);
            }}
            placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS ... 🔍"
          />
        </Container>
      </FormHolder>
    </div>
  );
};

export default SearchBar;
