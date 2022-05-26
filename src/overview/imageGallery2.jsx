import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 700px;
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
  z-index: 1;

`;

const BigImage = styled.img`
cursor: zoom-in;
  max-height: 700px;
  max-width: 700px;
`;

function ImageGallery(props) {
  const { style, styles, image, setImage } = props;

  return (
    <ImageContainer>
      <BigImageDiv>
        <BigImage src={styles[style].photos[image].url || noImageLink} />
      </BigImageDiv>
      {styles[style].photos.map((p, i) => (
        <Thumbnail
          key={i}
          className={i === image ? 'selected' : null}
        >
          <ThumbnailImg
            src={p.thumbnail_url || noImageLink}
            onClick={() => setImage(i)}
            className={i === image ? 'selected' : null}
          />
        </Thumbnail>
      ))}
    </ImageContainer>
  );
}

export default ImageGallery;
