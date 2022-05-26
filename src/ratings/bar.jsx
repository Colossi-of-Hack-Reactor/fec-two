import React from 'react';
import styled from 'styled-components';

const Parentdiv = styled.div`
  height: 10px;
  width: 100%;
  background-color: WhiteSmoke;
  margin: 20px;
  &:hover {
    border: 2px solid tomato;
    background-color: #ffe6de;
  }
`;

const Childdiv = styled.div`
  height: 100%;
  width: ${({progress}) => (progress)}%;
  background-color: DimGray;
  text-align: right;
  // &:hover {
  //   background-color: red;
  // }
`;

function Bar({ progress }) {
  return (
    <Parentdiv>
      <Childdiv progress={progress} />
    </Parentdiv>
  );
}

export default Bar;
