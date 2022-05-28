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

const StyleDiv = styled.div`
  display: grid;
  position: relative;
  align-items: center;
  justify-items: center;
`;

const StyleGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const StyleImage = styled.img`
  cursor: pointer;
  height: 100px;
  width: 100px;
  border-radius: 50%;
`;

const Check = styled.img`
  position: absolute;
  height: 100px;
  width: 100px;
  z-index: 2;
  opacity: 0.8;
`;

const WhiteBG = styled.span`
  position: absolute;
  background-color: rgba(255, 255, 255, .4);
  border-radius: 50%;
  height: 100px;
  width: 100px;
  z-index: 1;
`;

const ImageContainer = styled.div`
  display: flex;
  position: relative;
`;

const Thumbnail = styled.div`
  ${(props) => (props.disp ? '' : 'display: none;')}
  z-index: 2;
  width: fit-content;
  height: fit-content;
  padding: 4px;
`;

const ThumbnailImg = styled.img`
  height: 80px;
  width: 80px;
  cursor: pointer;
  margin: 8px;
  outline: 1px solid white;
  box-shadow: 0px 0px 6px 6px rgba(0,0,0, .5);

  &.selected {
    box-shadow: 0px 0px 6px 6px rgba(250, 70, 22, 1);
  }
`;
// border-image: linear-gradient(to bottom right, rgba(250,70,22,1) 0%, rgba(0,33,165,1) 100%) 1;

const ThumbnailDiv = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

const BigImageDiv = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  ${(props) => props.vis ? '' : 'display: none;'};
  transition: opacity .4s linear;
`;

const BigImage = styled.img`
  cursor: zoom-in;
  max-height: 100%;
  max-width: 100%;
`;

const ArrowContainer = styled.div`
  z-index: 2;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, .5);
  visibility: ${(props) => (props.vis ? 'visible' : 'hidden')};
`;

const Arrow = styled.img`
  cursor: ${(props) => (props.cur)};
  z-index: 2;
  height: 50px;
  width: 50px;
  opacity: .8;
`;

const ArrowDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4px;
  z-index: 2;
`;

const ArrowDivV = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px;
`;

const BigArrowDiv = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
`;

export {
  Product, Sale, Original, OverviewDiv, ImageDiv, InfoDiv, WordsDiv, SloDesDiv, FeatsDiv,
  OverallDiv, StyleDiv, StyleGrid, StyleImage, Check, WhiteBG, ImageContainer, Thumbnail,
  ThumbnailDiv, ThumbnailImg, BigImageDiv, ArrowContainer, Arrow, ArrowDiv, ArrowDivV,
  BigArrowDiv, BigImage,
};
