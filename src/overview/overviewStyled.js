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
  opacity: .75;
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
  ${(props) => (props.vis ? '' : 'display: none;')};
`;

const BigImage = styled.img`
  cursor: zoom-in;
  max-height: 100%;
  max-width: 100%;
`;

const ArrowContainer = styled.div`
  z-index: ${(props) => (props.zidx)};
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, .4);
  visibility: ${(props) => (props.vis ? 'visible' : 'hidden')};
`;

const Arrow = styled.img`
  cursor: ${(props) => (props.cur)};
  z-index: ${(props) => (props.zidx)};
  height: 50px;
  width: 50px;
  opacity: .75;
`;

const ArrowDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  z-index: ${(props) => (props.zidx)};
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

const FullScreenDiv = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 7;
    background-color: rgba(0, 0, 0, 1);
    display: flex;
`;

const ExpandedThumbnailDiv = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  z-index: 10;
`;

const ThumbnailIcon = styled.div`
  border-radius: 50%;
  margin: 8px 15px;
  width: 30px;
  height: 30px;
  z-index: 11;
  cursor: pointer;
  outline: 1px solid rgba(0, 0, 0, .8);
  box-shadow: 0px 0px 4px 4px rgba(255, 255, 255, .8);

  &.selected {
    background-color: rgba(250, 70, 22, 1);
    box-shadow: 0px 0px 4px 4px rgba(250, 70, 22, 1);
  }

`;

const CloseButton = styled.img`
  position: absolute;
  height: 50px;
  width: 50px;
  top: 5%;
  right: 5%;
  z-index: 12;
  opacity: .75;
  cursor: pointer;
`;

const ExpandedWhiteBG = styled.span`
  position: absolute;
  background-color: rgba(255, 255, 255, .4);
  border-radius: 50%;
  top: 5%;
  right: 5%;
  height: 50px;
  width: 50px;
  z-index: 11;
`;

export {
  Product, Sale, Original, OverviewDiv, ImageDiv, InfoDiv, WordsDiv, SloDesDiv, FeatsDiv,
  OverallDiv, StyleDiv, StyleGrid, StyleImage, Check, WhiteBG, ImageContainer, Thumbnail,
  ThumbnailDiv, ThumbnailImg, BigImageDiv, ArrowContainer, Arrow, ArrowDiv, ArrowDivV,
  BigArrowDiv, BigImage, FullScreenDiv, ExpandedThumbnailDiv, ThumbnailIcon, CloseButton,
  ExpandedWhiteBG,
};
