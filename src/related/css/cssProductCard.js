import styled from 'styled-components';

const SlimDiv = styled.div`
  display: grid;
  grid-template-rows: 320px;
  border: 1px solid #E6E6E6;
  border-radius: 10px;
  padding: 20px;
  height: 450px;
  width: 200;
`;

const ActionBut = styled.button`
  max-height; 50px;
`;

const UnisizeImg = styled.img`
  border-radius: 5px;
  max-height: 400px;
  min-width: 200px;
  max-width: 200px;
  height: auto;
  width: auto;
  align-self: center;
`;

export {
  SlimDiv, UnisizeImg, ActionBut,
};
