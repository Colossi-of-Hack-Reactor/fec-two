import React, { useState, useEffect } from 'react';
import ExpandedView from './expandedView.jsx';
import {
  Thumbnail, ThumbnailImg, ThumbnailDiv,
} from './overviewStyled.js';

const noImageLink = '/assets/No_image_available.svg';

function within(i, img) {


}

function Thumbnails(props) {
  const { style, styles, image, setImage } = props;

  return (
    <ThumbnailDiv>
      {styles[style].photos.map((p, i) => (
        <Thumbnail
          className={i === image ? 'selected' : null}
          key={i}
        >
          <ThumbnailImg
            src={p.thumbnail_url || noImageLink}
            onClick={() => setImage(i)}
            className={i === image ? 'selected' : null}
          />
        </Thumbnail>
      ))}
    </ThumbnailDiv>
  );
}

export default Thumbnails;
