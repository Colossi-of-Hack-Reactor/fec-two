import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SearchResultDiv = styled.div`
  cursor: pointer;
  ${(props) => (props.hover ? 'background-color: orange;' : '')}
`;

function SearchResult(props) {
  const [hover, setHover] = useState();
  const { name, id, setProduct_id } = props;

  return (
    <SearchResultDiv
      onMouseOver={() => { setHover(true); }}
      onMouseOut={() => { setHover(false); }}
      onClick={() => { setProduct_id(id); }}
      hover={hover}
    >
      {name}
    </SearchResultDiv>
  );
}

export default SearchResult;
