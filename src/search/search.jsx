import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SearchResult from './searchResult.jsx';
import { CloseLink } from '../overview/overviewAssets.js';

const SearchDropdown = styled.div`
  margin-top: 4px;
  position: absolute;
  top: 106px;
  max-height: 70vh;
  width: 90vw;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  flex-wrap: wrap;
  background-color: #e9ecef;
  color: black;
  font-size: 22px;
`;

const SearchInput = styled.input`
  border: none;
  border-bottom: 1px solid #e9ecef;
  color: #e9ecef;
  background-color: black;
  width: 85vw;
  padding: 8px;
  margin: 20px;
  height: 30px;
  font-size: 30px;
  outline: none;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SearchBanner = styled.div`
  position: fixed;
  background-color: black;
  color: #e9ecef;
  width: 100%;
  height: 110px;
  top: 0;
  left: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  transform: translateY(${(props) => (props.show ? '0px' : '-110px')});
  transition: .4s ease-in-out;
`;

const CloseSearch = styled.img`
  cursor: pointer;
  height: 30px;
  width: 30px;
  margin-bottom: 29px;
`;

const CloseDiv = styled.div`
  display: flex;
  direction: column;
  align-items: flex-end;
`;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  background-color: rgba(0, 0, 0, .4);
  ${(props) => (props.show ? '' : 'display: none;')}
  opacity: ${(props) => (props.show ? '1' : '0')};
  transition: opacity .5s ease-in-out;
`;

function Search(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { setProduct_id, showSearch, setShowSearch, searchRef } = props;

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

  useEffect(() => {
    document.body.style.overflow = showSearch ? 'hidden' : 'visible';
  }, [showSearch]);

  return (
    <>
      <Background show={showSearch} />
      <SearchBanner show={showSearch}>
        <SearchBox>
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            ref={searchRef}
          />
          <CloseDiv>
            <CloseSearch
              src={CloseLink}
              onClick={() => {
                setSearchTerm('');
                setShowSearch(false);
              }}
              alt="close search"
            />
          </CloseDiv>
          {searchResults.length ? (
            <SearchDropdown show>
              {searchResults.map((r) => (
                <SearchResult
                  name={r.name}
                  id={r.id}
                  setProduct_id={setProduct_id}
                  setSearchTerm={setSearchTerm}
                  setShowSearch={setShowSearch}
                />
              ))}
          </SearchDropdown>
          ) : (searchTerm.length >= 3 ? (
            <SearchDropdown show>
              <div>
                No results found.
              </div>
          </SearchDropdown>
          ) : <SearchDropdown show={false} />)}
        </SearchBox>
      </SearchBanner>
    </>
  );
}

export default Search;
