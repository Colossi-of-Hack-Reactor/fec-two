import React, { useState, useEffect } from 'react';
import ExpandedView from './expandedView.jsx';
import Thumbnails from './thumbnails.jsx';
import {
  ImageContainer, BigImageDiv, ArrowContainer, Arrow, ArrowDiv, BigArrowDiv,
} from './overviewStyled.js';

const noImageLink = '/assets/No_image_available.svg';
const LeftArrowLink = '/assets/angle-circle-left.svg';
const RightArrowLink = '/assets/angle-circle-right.svg';
const UpArrowLink = '/assets/angle-circle-up.svg';
const DownArrowLink = '/assets/angle-circle-down.svg';

function ImageGallery(props) {
  const { style, styles, image, setImage } = props;
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    document.body.style.overflow = zoom ? 'hidden' : 'visible';
  }, [zoom]);

  return (
    <ImageContainer>
      {styles[style].photos.map((p, i) => (
        <BigImageDiv
          bg={p.url || noImageLink}
          onClick={() => setZoom(true)}
          vis={i === image}
          key={i}
        />
      ))}
      <Thumbnails style={style} styles={styles} image={image} setImage={setImage} />
      <BigArrowDiv>
        <ArrowDiv>
          <ArrowContainer>
            <Arrow
              src={LeftArrowLink}
              onClick={() => setImage((a) => Math.max(0, a - 1))}
            />
          </ArrowContainer>
        </ArrowDiv>
        <ArrowDiv>
          <ArrowContainer>
            <Arrow
              src={RightArrowLink}
              onClick={() => setImage((a) => Math.min(styles[style].photos.length - 1, a + 1))}
            />
          </ArrowContainer>
        </ArrowDiv>
      </BigArrowDiv>
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
