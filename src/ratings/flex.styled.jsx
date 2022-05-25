import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-flow: row wrap;
  // justify-content: space-evenly;

`;

const RatingContainer = styled.div`
  width: 25%;
`;

const FormContainer = styled.div`
  color: purple;
  width: 90%;
  margin: 10px auto;
  top: 10;
  left: 10;
`;

const FormEleContainer = styled.div`
  width: 25%;
`;

const FormHeader = styled.div`
 color: black
`;

export { Flex, RatingContainer, FormContainer, FormEleContainer, FormHeader };