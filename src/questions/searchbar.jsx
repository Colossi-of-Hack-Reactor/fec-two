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
  height: 40px;
  ::placeholder {
    font-weight: 800;
    font-size: 13px;
  }
`;

const FormHolder = styled.form`
  width: 100%;
  overflow: hidden;
`;

const SearchBar = function SearchBar({ qainfo, setQainfo, setQuestionsToDisplay, sorted, setSorted }) {
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    console.log(qainfo);
    if (searchTerm.length >= 3) {
      const sortedInfo = [];
      for (let i = 0; i < qainfo.length; i += 1) {
        if (qainfo[i].question_body.includes(searchTerm)) {
          sortedInfo.push(qainfo[i]);
        }
      }
      setQuestionsToDisplay(sortedInfo.length);
      setSorted(() => sortedInfo);
    } else { setSorted(qainfo); setQuestionsToDisplay(4)}
  }, [searchTerm]);

  const handleChange = function handleChange(input) {
    setSearchTerm(input);
  };

  const handleSubmit = (event) => {
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
