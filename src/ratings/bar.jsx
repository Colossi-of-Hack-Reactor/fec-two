import React from 'react';
import styled from 'styled-components';

const Parentdiv = styled.div`
  height: 15px;
  width: 100%;
  background-color: WhiteSmoke;
  // margin: 50px;
`;

const Childdiv = styled.div`
  height: 100%;
  width: ${({progress}) => (progress)}%;
  background-color: DimGray;
  text-align: right;
`;

const Progresstext = styled.div`
  // padding: 10px;
  color: black;
  font-weight: 900;
`;

function Bar({ progress }) {
  return (
    <Parentdiv>
      <Childdiv progress={progress}>
        <Progresstext>{progress}</Progresstext>
      </Childdiv>
    </Parentdiv>
  );
}

export default Bar;
