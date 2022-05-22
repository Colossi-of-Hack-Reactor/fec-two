import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
    font-weight: 800;
    font-size: 13px;
  }

`;

const SearchBar = function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = function handleChange(input) {
    setSearchTerm(input);
  };

  const handleSubmit = (event) => {
    // 👇️ prevent page refresh
    event.preventDefault();

    console.log("form submitted ✅");
  };
  return (
    <div className="questionSearch">
      <form onSubmit={handleSubmit}>
        <Title className="searchbartitle">QUESTIONS & ANSWERS </Title>
        <SearchInput
          onChange={(event) => {
            event.preventDefault();
            handleChange(event.target.value);
          }}
          placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS ... 🔍"
        />
      </form>
    </div>
  );
};

export default SearchBar;
