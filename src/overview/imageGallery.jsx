import React from 'react';
import styled from 'styled-components';
import ImageGallery from 'react-image-gallery';
import LeftNav from './r-i-g-src/controls/LeftNav.js';
import RightNav from './r-i-g-src/controls/RightNav.js';

const ImageContainer = styled.div`

`;

const noImageLink = '/assets/No_image_available.svg';

function StyleSelector(props) {
  const { style, styles } = props;
  let images;
  if (styles[style].photos[0].url !== null) {
    images = styles[style].photos.map(photo => ({
      original: photo.url,
      thumbnail: photo.thumbnail_url,
      originalHeight: '700px',
    }));
  } else {
    images = [{
      original: noImageLink,
      thumbnail: noImageLink,
      originalHeight: '700px',
    }];
  }
  return (
    <ImageContainer>
      <ImageGallery
        items={images}
        infinite={false}
        thumbnailPosition="left"
        showPlayButton={false}
        renderLeftNav={(onClick, disabled) => {
          if (disabled) {
            return null;
          }
          return <LeftNav onClick={onClick} disabled={disabled} />;
        }}
        renderRightNav={(onClick, disabled) => {
          if (disabled) {
            return null;
          }
          return <RightNav onClick={onClick} disabled={disabled} />;
        }}
      />
    </ImageContainer>
  );
}

export default StyleSelector;
