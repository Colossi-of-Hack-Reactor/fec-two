import React from 'react';
import styled from 'styled-components';
import ImageGallery from 'react-image-gallery';
import LeftNav from './r-i-g-src/controls/LeftNav.js';
import RightNav from './r-i-g-src/controls/RightNav.js';

const ImageContainer = styled.div`
  width: 800px;
`;

function StyleSelector(props) {
  const { style, styles } = props;
  const images = styles[style].photos.map(photo => ({
    original: photo.url,
    thumbnail: photo.thumbnail_url,
    originalHeight: '700px',
    originalWidth: '700px',
    thumbnailHeight: '100px',
    thumbnailWidth: '100px',
  }));

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
