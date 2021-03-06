import React from 'react';
import styled from 'styled-components';

const Triangle = styled.div`
  margin: 20px
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: ${({ percentage }) => (percentage)}%;
  background-color: transparent;
  border-style: solid;
  border-top-width: 14px;
  border-right-width: 7px;
  border-bottom-width: 0px;
  border-left-width: 7px;
  border-top-color: black;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
`;

const Box = styled.div`
  height: 10px;
  width: 19%;
  background-color: WhiteSmoke;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;;
  align-items: space-between
`;

const ContainerTop = styled.div`
  position: relative;
`;

function Boxes() {
  return (
    <Container>
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
    </Container>
  );
}

function ArrowDown({ percentage }) {
  return (
    <ContainerTop>
      <Boxes />
      <Triangle percentage={percentage} />
    </ContainerTop>
  );
}

export default ArrowDown;
