import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Thumbnail = styled.div`
  padding: 4px;
  &.selected {
    padding: 0;
  }
  z-index: 2;
  width: fit-content;
`;

const FullScreenDiv = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 8;
    background-color: rgba(0, 0, 0, 1);
    display: flex;
    flex-direction: column;
`;

const ZoomZoomDiv = styled.div.attrs(props => ({
  style: {
  "backgroundPosition": props.zoomZoom ? `${props.mouseLoc[0]}% ${props.mouseLoc[1]}%` : 'center'
}}))`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9;
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
  z-index: 10;
  cursor: pointer;
  &.selected {
    background-image: linear-gradient(to bottom right, rgba(250,70,22,1) 0%, rgba(0,33,165,1) 100%);
  }
`;

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
      {zoomZoom ? null :
      styles[style].photos.map((p, i) => (
        <ThumbnailIcon
          key={i}
          className={i === image ? 'selected' : null}
          onClick={() => setImage(i)}
        />
      ))}
    </FullScreenDiv>
  );
}

export default ExpandedView;
