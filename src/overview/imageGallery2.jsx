import React, { useState, useEffect } from 'react';
import ExpandedView from './expandedView.jsx';
import Thumbnails from './thumbnails.jsx';
import {
  ImageContainer, BigImageDiv, ArrowContainer, Arrow, ArrowDiv, BigArrowDiv, BigImage,
} from './overviewStyled.js';
import { LeftArrowLink, RightArrowLink, noImageLink } from './overviewAssets.js';

function ImageGallery(props) {
  const { style, styles, image, setImage, thumb, setThumb } = props;
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    document.body.style.overflow = zoom ? 'hidden' : 'visible';
  }, [zoom]);

  return (
    <ImageContainer>
      {styles[style].photos.map((p, i) => (
        <BigImageDiv
          vis={i === image}
          key={i}
        >
          <BigImage
            src={p.url || noImageLink}
            onClick={() => setZoom(true)}
            vis={i === image}
            key={i}
          />
        </BigImageDiv>
      ))}
      <Thumbnails
        style={style}
        styles={styles}
        image={image}
        setImage={setImage}
        thumb={thumb}
        setThumb={setThumb}
      />
      <BigArrowDiv>
        <ArrowDiv zidx={2}>
          <ArrowContainer vis={image !== 0} zidx={2}>
            <Arrow
              src={LeftArrowLink}
              onClick={() => setImage((a) => Math.max(0, a - 1))}
              cur="w-resize"
              zidx={2}
            />
          </ArrowContainer>
        </ArrowDiv>
        <ArrowDiv zidx={2}>
          <ArrowContainer vis={image !== styles[style].photos.length - 1} zidx={2}>
            <Arrow
              src={RightArrowLink}
              onClick={() => setImage((a) => Math.min(styles[style].photos.length - 1, a + 1))}
              cur="e-resize"
              zidx={2}
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
