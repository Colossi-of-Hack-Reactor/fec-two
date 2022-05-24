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
  width: 50%;
  margin: 50px auto;
  top: 50;
  left: 50;
`;

export { Flex, RatingContainer, FormContainer };
