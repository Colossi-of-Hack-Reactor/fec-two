import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  ArrowContainer, Arrow, ArrowDiv, BigArrowDiv, FullScreenDiv, ExpandedThumbnailDiv,
  ThumbnailIcon, CloseButton, ExpandedWhiteBG,
} from './overviewStyled.js';
import {
  CloseMarkLink, LeftArrowLink, RightArrowLink, PlusLink, MinusLink,
} from './overviewAssets.js';

const ZoomZoomDiv = styled.div.attrs((props) => ({
  style: {
    backgroundPosition: props.zoomZoom ? `${props.mouseLoc[0]}% ${props.mouseLoc[1]}%` : 'center',
  },
}))`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 8;
  background-image: url(${(props) => (props.bg)});
  background-repeat: no-repeat;
  background-size: ${(props) => (props.zoomZoom ? '150%' : 'contain')};
  cursor: ${(props) => (props.zoomZoom ? `url(${MinusLink}) 15 15, zoom-out` : `url(${PlusLink}) 15 15, zoom-in`)};
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
        onClick={(e) => {
          setClickCoord([e.clientX, e.clientY]);
          setZoomZoom((z) => !z);
        }}
        bg={styles[style].photos[image].url || noImageLink}
        zoomZoom={zoomZoom}
        mouseLoc={[mouseCoord[0] / windowSize[0] * 100, mouseCoord[1] / windowSize[1] * 100]}
      />
      {zoomZoom ? null : (
        <>
          <ExpandedThumbnailDiv>
            {styles[style].photos.map((p, i) => (
              <ThumbnailIcon
                key={i}
                className={i === image ? 'selected' : null}
                onClick={() => setImage(i)}
              />
            ))}
          </ExpandedThumbnailDiv>
          <BigArrowDiv>
            <ArrowDiv zidx={11}>
              <ArrowContainer vis={image !== 0} zidx={11}>
                <Arrow
                  src={LeftArrowLink}
                  onClick={() => setImage((a) => Math.max(0, a - 1))}
                  cur="w-resize"
                  zidx={11}
                />
              </ArrowContainer>
            </ArrowDiv>
            <ArrowDiv zidx={11}>
              <ArrowContainer vis={image !== styles[style].photos.length - 1} zidx={11}>
                <Arrow
                  src={RightArrowLink}
                  onClick={() => setImage((a) => Math.min(styles[style].photos.length - 1, a + 1))}
                  cur="e-resize"
                  zidx={11}
                />
              </ArrowContainer>
            </ArrowDiv>
          </BigArrowDiv>
          <ExpandedWhiteBG />
          <CloseButton onClick={() => setZoom(false)} src={CloseMarkLink} />
        </>
      )}
    </FullScreenDiv>
  );
}

export default ExpandedView;
