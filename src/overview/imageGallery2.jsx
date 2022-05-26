import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ExpandedView from './expandedView.jsx';

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
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
  background: url(${(props) => (props.bg)}) no-repeat;
  background-size: contain;
  cursor: zoom-in;
  height: 100%;
  width: 100%;
  opacity: ${(props) => props.vis ? 1 : 0};
  transition: opacity .5s ease-in;
`;

const BigImage = styled.img`
cursor: zoom-in;
  max-height: 700px;
  max-width: 700px;
`;

function ImageGallery(props) {
  const { style, styles, image, setImage } = props;
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    document.body.style.overflow = zoom ? 'hidden' : 'visible';
  }, [zoom]);

  return (
    <ImageContainer>
      {styles[style].photos.map((p, i) => (
        <>
          <BigImageDiv
            bg={p.url || noImageLink}
            onClick={() => setZoom(true)}
            vis={i === image}
          />
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
        </>
      ))}
      {zoom ? (
        <ExpandedView
          style={style}
          styles={styles}
          image={image}
          setImage={setImage}
          setZoom={setZoom}
          noImageLink={noImageLink}
        />
      ) : null}
    </ImageContainer>
  );
}

export default ImageGallery;
