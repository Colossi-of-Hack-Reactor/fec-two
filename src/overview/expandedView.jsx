import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
    flex-direction: column;
    justify-content: center;
`;

const ZoomZoomDiv = styled.div.attrs(props => ({
  style: {
  "backgroundPosition": props.zoomZoom ? `${props.mouseLoc[0]}% ${props.mouseLoc[1]}%` : 'center'
}}))`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-image: url(${(props) => (props.bg)});
  background-repeat: no-repeat;
  background-size: ${(props) => props.zoomZoom ? '150%' : 'contain'};
  cursor: ${(props) => props.zoomZoom ? 'zoom-out' : 'zoom-in'};
  transition: background-size 1s ease-in;

`;

const ThumbnailIcon = styled.div`
  border-radius: 50%;
  margin: 10px;
  width: 30px;
  height: 30px;
  background-color: white;
  z-index: 11;
  cursor: pointer;
  &.selected {
    background-image: linear-gradient(to bottom right, rgba(250,70,22,1) 0%, rgba(0,33,165,1) 100%);
  }
`;

const CloseButton = styled.img`
  position: absolute;
  height: 50px;
  width: 50px;
  top: 1%;
  right: 1%;
  z-index: 12;
  opacity: 0.8;
  cursor: pointer;
`;

const WhiteBG = styled.span`
  position: absolute;
  background-color: rgba(255, 255, 255, .6);
  border-radius: 50%;
  top: 1%;
  right: 1%;
  height: 50px;
  width: 50px;
  z-index: 11;
`;

const CloseMarkLink = '/assets/close-round-line.svg';
const LeftArrowLink = '/assets/line-angle-left.svg';
const RightArrowLink = '/assets/line-angle-right.svg';
const UpArrowLink = '/assets/line-angle-up.svg';
const DownArrowLink = '/assets/line-angle-down.svg';

function ExpandedView(props) {
  const { style, styles, image, setImage, setZoom, noImageLink } = props;
  const [zoomZoom, setZoomZoom] = useState(false);
  const [clickCoord, setClickCoord] = useState([0, 0]);
  const [windowSize, setWindowSize] = useState([0, 0]);
  const [mouseCoord, setMouseCoord] = useState([0, 0]);

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === 'Escape') {
        setZoom(false);
      }
    }
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    function handleMouseMove(e) {
      setMouseCoord([e.clientX, e.clientY]);
    }
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <FullScreenDiv>
      <ZoomZoomDiv
        bg={styles[style].photos[image].url || noImageLink}
        onClick={(e) => {
          setClickCoord([e.clientX, e.clientY]);
          setZoomZoom((z) => !z);
        }}
        clickCoord={clickCoord}
        zoomZoom={zoomZoom}
        mouseCoord={mouseCoord}
        mouseLoc={[mouseCoord[0] / windowSize[0] * 100, mouseCoord[1] / windowSize[1] * 100]}
      />
      {zoomZoom ? null : (
        <>
          {styles[style].photos.map((p, i) => (
            <ThumbnailIcon
              key={i}
              className={i === image ? 'selected' : null}
              onClick={() => setImage(i)}
            />
          ))}
          <WhiteBG />
          <CloseButton onClick={() => setZoom(false)} src={CloseMarkLink} />
        </>
      )}
    </FullScreenDiv>
  );
}

export default ExpandedView;
