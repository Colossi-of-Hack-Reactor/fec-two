import styled from 'styled-components';

const Product = styled.div`
  color: blue;

  &:hover {
    cursor: pointer;
  }
`;

const Sale = styled.span`
  color: red;
`;

const Original = styled.span`
  text-decoration: line-through;
  text-decoration-style: solid;
`;

const OverviewDiv = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
`;

const ImageDiv = styled.div`
  padding: 10px;
`;

const InfoDiv = styled.div`
  padding: 10px;
`;

const WordsDiv = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
`;

const SloDesDiv = styled.div`
  padding: 10px;
`;

const FeatsDiv = styled.div`
  padding: 10px;
`;

const OverallDiv = styled.div`
  max-width: 1000px;
`;
export {
  Product, Sale, Original, OverviewDiv, ImageDiv, InfoDiv, WordsDiv, SloDesDiv, FeatsDiv,
  OverallDiv,
};
