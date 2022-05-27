import React from 'react';
import styled from 'styled-components';

const Parentdiv = styled.div`
  height: 10px;
  width: 100%;
  background-color: WhiteSmoke;
  margin-top: 15px;
  margin-bottom: 14px;
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
`;

function Bar({ progress }) {
  return (
    <Parentdiv>
      <Childdiv progress={progress} />
    </Parentdiv>
  );
}

export default Bar;
