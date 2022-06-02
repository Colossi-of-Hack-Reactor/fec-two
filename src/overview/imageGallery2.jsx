import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import ExpandedView from './expandedView.jsx';
import Thumbnails from './thumbnails.jsx';
import {
  ImageContainer, BigImageDiv, ArrowContainer, Arrow, ArrowDiv, BigArrowDiv,
} from './overviewStyled.js';
import { LeftArrowLink, RightArrowLink, noImageLink } from './overviewAssets.js';

function ImageGallery(props) {
  const {
    style, styles, image, setImage, thumb, setThumb,
  } = props;
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    document.body.style.overflow = zoom ? 'hidden' : 'visible';
  }, [zoom]);

  return (
    <ImageContainer data-testid="imageGallery">
      {styles[style].photos.map((p, i) => (
        <BigImageDiv
          vis={i === image}
          key={i}
          bg={p.url || noImageLink}
          data-testid={`bigImg-${i}`}
          onClick={() => setZoom(true)}
        />
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
              data-testid="leftArrow"
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
              data-testid="rightArrow"
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

ImageGallery.propTypes = {
  style: PropTypes.number.isRequired,
  styles: PropTypes.arrayOf(PropTypes.shape).isRequired,
  image: PropTypes.number.isRequired,
  setImage: PropTypes.func.isRequired,
  thumb: PropTypes.number.isRequired,
  setThumb: PropTypes.func.isRequired,
};

export default ImageGallery;
