import React, { useState } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: ${(props) => props.zoom ? '' : 'relative'};
`;

const noImageLink = '/assets/No_image_available.svg';

const Thumbnail = styled.div`
  padding: 4px;
  &.selected {
    padding: 0;
  }
  z-index: 2;
  width: fit-content;
`;

const ThumbnailImg = styled.img`
  max-height: 100px;
  max-width: 100px;
  cursor: pointer;

  &.selected {
    border-width: 4px;
    border-style: solid;
    border-image: linear-gradient(to bottom right, rgba(250,70,22,1) 0%, rgba(0,33,165,1) 100%) 1;
  }
`;

const BigImageDiv = styled.div`
  position: absolute;
  z-index: ${(props) => props.zoom ? 10 : 1};
  background: url(${(props) => (props.bg)}) no-repeat;
  background-size: ${(props) => props.zoom ? '' : 'contain'};
  cursor: zoom-in;
  height: 100%;
  width: 100%;

`;

const BigImage = styled.img`
cursor: zoom-in;
  max-height: 700px;
  max-width: 700px;
`;

const FullDiv = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: url(${(props) => (props.bg)}) no-repeat;
    background-color: rgba(0, 0, 0, .9);
    background-size: ${(props) => props.zoom ? '' : 'contain'};
    background-position: center;
    cursor: zoom-out;
`;

function ExpandedView(props) {
  const { style, styles, image, setImage, setZoom, noImageLink } = props;

  return (
    <FullDiv
      bg={styles[style].photos[image].url || noImageLink}
      onClick={() => setZoom(false)}
    />
  );
}

export default ExpandedView;
