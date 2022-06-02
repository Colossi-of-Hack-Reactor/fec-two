import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SearchResult from './searchResult.jsx';

const SearchArea = styled.div`
  position: relative;
  display: inline-block;
`;
const SearchDropdown = styled.div`
  position: absolute;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  background-color: white;
  color: black;
`;

function Search(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { setProduct_id } = props;

  useEffect(() => {
    if (searchTerm.length >= 3) {
      axios.get(`/search/${searchTerm}`)
        .then((response) => {
          setSearchResults(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <SearchArea>
      <textarea value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      {searchResults.length ? (
        <SearchDropdown show>
          {searchResults.map((r) => (
            <SearchResult name={r.name} id={r.id} setProduct_id={setProduct_id} />
          ))}
      </SearchDropdown>
      ) : (searchTerm.length >= 3 ? (
        <SearchDropdown show>
          <div>
            No results found.
          </div>
      </SearchDropdown>
      ) : <SearchDropdown show={false} />)}
    </SearchArea>
  );
}

export default Search;
