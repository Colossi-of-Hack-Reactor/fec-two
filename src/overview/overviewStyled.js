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
  margin: 10px;
  margin-right: 15px;
`;

const InfoDiv = styled.div`
  margin: 10px;
  margin-left: 15px;
`;

const WordsDiv = styled.div`
  display: grid;
  grid-template-columns: 65% 35%;
`;

const SloDesDiv = styled.div`
  padding: 10px;
  border-right: 1px solid #bbb;
`;

const FeatsDiv = styled.div`
  padding: 10px;
  border-left: 1px solid #bbb;
`;

const OverallDiv = styled.div`
  padding-top: 140px;
`;

const StyleDiv = styled.div`
  display: grid;
  position: relative;
  align-items: center;
  justify-items: center;
  padding: 5px;
`;

const StyleGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const StyleImage = styled.img`
  cursor: pointer;
  height: 80px;
  width: 80px;
  border-radius: 50%;
`;

const Check = styled.img`
  position: absolute;
  height: 80px;
  width: 80px;
  z-index: 2;
  opacity: .75;
`;

const WhiteBG = styled.span`
  position: absolute;
  background-color: rgba(255, 255, 255, .4);
  border-radius: 50%;
  height: 80px;
  width: 80px;
  z-index: 1;
`;

const ImageContainer = styled.div`
  display: flex;
  position: relative;
  min-height: 500px;
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
  visibility: ${(props) => (props.vis ? 'visible' : 'hidden')};
  background-image: url(${(props) => (props.bg)});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const BigImage = styled.img`
  cursor: zoom-in;
  object-fit: cover;
  height: 872px;
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

const ToggleFullscreenButton = styled.img`
  height: 25px;
  width: 25px;
  z-index: 12;
  opacity: .75;
  cursor: pointer;
`;

const ToggleFullscreenBG = styled.span`
  position: absolute;
  background-color: rgba(255, 255, 255, .4);
  bottom: 5%;
  right: 5%;
  height: 42px;
  width: 42px;
  z-index: 11;
  border: 4px solid rgba(0, 0, 0, .75);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectSizeMsg = styled.div`
  opacity: ${(props) => (props.vis ? 1 : 0)};
  color: red;
  transition: opacity .5s;
  position: absolute;
  top: -10px;
  left: 10px;
`;

const SizeQuantityDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
`;

const SelectSpan = styled.span`
  margin: 10px;
  height: 35px;
  display: flex;
  justify-content: center;
`;

const CategoryDiv = styled.div`
  text-transform: uppercase;
  font-size: 14px;
  margin-bottom: 10px;
`;

const ProductNameDiv = styled.div`
  font-size: 28px;
  font-weight: 700;
`;

const PriceDiv = styled.div`
  font-size: 22px;
`;

const StyleNameDiv = styled.div`
  text-transform: uppercase;
`;

const SocialDiv = styled.div`
  margin: 1px;
`;

const SocialImg = styled.img`
  margin: 10px;
  height: 30px;
  width: 30px;
`;

const OverviewSelect = styled.select`
  width: 100%;
  height: 100%;
  border: none;
  border-bottom: 1px solid black;
  background-color: #e9ecef;
  font-family: 'Helvetica Neue', serif;
  font-size: 16px;
`;

const BagOutfitDiv = styled.div`
  display: grid;
  grid-template-columns: 7fr 3fr;
  margin: 4px;
`;

const BagButton = styled.button`
  width: 100%;
  height: 100%;
  color: #e9ecef;
  background-color: black;
  font-family: 'Helvetica Neue', serif;
  font-size: 16px;
`;

const StarButton = styled.img`
  height: 100%;
`;

const ReviewsSpan = styled.span`
  padding-left: 10px;
  cursor: pointer;
`;

export {
  Product, Sale, Original, OverviewDiv, ImageDiv, InfoDiv, WordsDiv, SloDesDiv, FeatsDiv,
  OverallDiv, StyleDiv, StyleGrid, StyleImage, Check, WhiteBG, ImageContainer, Thumbnail,
  ThumbnailDiv, ThumbnailImg, BigImageDiv, ArrowContainer, Arrow, ArrowDiv, ArrowDivV,
  BigArrowDiv, BigImage, FullScreenDiv, ExpandedThumbnailDiv, ThumbnailIcon, CloseButton,
  ExpandedWhiteBG, SelectSizeMsg, SizeQuantityDiv, SelectSpan, CategoryDiv, ProductNameDiv,
  PriceDiv, StyleNameDiv, SocialDiv, SocialImg, ToggleFullscreenButton, ToggleFullscreenBG,
  OverviewSelect, BagOutfitDiv, BagButton, StarButton, ReviewsSpan,
};
