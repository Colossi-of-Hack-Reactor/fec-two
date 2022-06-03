import styled from 'styled-components';

const SlimDiv = styled.div`
  display: grid;
  grid-template-rows: 215px;
  border: 1px solid black;
  border-radius: 10px;
  padding-left: 20px;
  padding-right: 20px;
  min-width: 200px;
  min-height: 375px;
  max-height: 375px;
  padding-bottom: 10px;
  align-content:end;
`;

const LeftActionBut = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
`;
const RightActionBut = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;

const UnisizeImg = styled.img`
  border-radius: 5px;
  max-height: 200px;
  min-width: 200px;
  max-width: 200px;
  object-fit: cover;
  height: auto;
  width: auto;
  align-self:end;
`;

export {
  SlimDiv, UnisizeImg, LeftActionBut, RightActionBut,
};
