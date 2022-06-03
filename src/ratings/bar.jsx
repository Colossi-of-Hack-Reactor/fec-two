import React from 'react';
import styled from 'styled-components';

const Parentdiv = styled.div`
  height: 10px;
  width: 100%;
  background-color: WhiteSmoke;
  margin-top: 15px;
  margin-bottom: 14px;
  border: 2px solid transparent;
  &:hover {
    border: 2px solid rgb(230, 67, 47);
    background-color: #ffe6de;
    cursor: pointer;
  }
`;

const Childdiv = styled.div`
  height: 100%;
  width: ${({progress}) => (progress)}%;
  background-color: black;
  text-align: right;
`;

function Bar({ progress }) {
  return (
    <Parentdiv>
      <Childdiv progress={progress} />
    </Parentdiv>
  );
}

export default Bar;
