import React from 'react';
import styled from 'styled-components';

const Parentdiv = styled.div`
  height: ${height};
  width: 100%;
  backgroundColor: whitesmoke;
  borderRadius: 40;
  margin: 50;
`;

const Childdiv = styled.div`
  height: 100%;
  width: ${progress}%;
  backgroundColor: ${bgcolor};
  borderRadius: 40;
  textAlign: right;
`;

const Progresstext = styled.div`
  padding: 10;
  color: black;
  fontWeight: 900;
`;

function Bar({ bgcolor, progress, height }) {
  return (
    <Parentdiv height={height}>
      <Childdiv progress={progress} bgcolor={bgcolor}>
        <Progresstext>{`${progress}%`}</Progresstext>
      </Childdiv>
    </Parentdiv>
  );
}

export default Bar;
