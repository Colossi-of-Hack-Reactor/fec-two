import React, { useState, useEffect } from 'react';
import ExpandedView from './expandedView.jsx';
import {
  Thumbnail, ThumbnailImg, ThumbnailDiv, ArrowDiv, ArrowContainer, Arrow, ArrowDivV,
} from './overviewStyled.js';

const noImageLink = '/assets/No_image_available.svg';
const UpArrowLink = '/assets/angle-circle-up.svg';
const DownArrowLink = '/assets/angle-circle-down.svg';

function within(i, img, len) {
  if (len < 8) {
    return true;
  }
  let low = img - 3;
  let high = img + 3;
  if (low < 0) {
    low = 0;
    high = 6;
  }
  if (high > len - 1) {
    high = len - 1;
    low = len - 7;
  }
  return i >= low && i <= high;
}

function Thumbnails(props) {
  const { style, styles, image, setImage } = props;
  const [thumb, setThumb] = useState(6);

  useEffect(() => {
    if (image > thumb) {
      setThumb(image);
    } else if (image < thumb - 6) {
      setThumb(image + 6);
    }
  }, [image]);
  return (
    <ThumbnailDiv>
      {styles[style].photos.length > 7 ? (
        <ArrowDivV>
          <ArrowContainer vis={thumb !== 6}>
            <Arrow
              src={UpArrowLink}
              onClick={() => setThumb((a) => Math.max(6, a - 1))}
              cur="n-resize"
            />
          </ArrowContainer>
        </ArrowDivV>
      ) : (
        <ArrowDivV>
          <ArrowContainer vis={false}>
            <Arrow
              src={UpArrowLink}
              cur="default"
            />
          </ArrowContainer>
        </ArrowDivV>
      )}
      {styles[style].photos.map((p, i) => (
        <Thumbnail
          className={i === image ? 'selected' : null}
          key={i}
          disp={i >= thumb - 6 && i <= thumb}
        >
          <ThumbnailImg
            src={p.thumbnail_url || noImageLink}
            onClick={() => setImage(i)}
            className={i === image ? 'selected' : null}
          />
        </Thumbnail>
      ))}
      {styles[style].photos.length > 7 ? (
        <ArrowDivV>
          <ArrowContainer vis={thumb !== styles[style].photos.length - 1}>
            <Arrow
              src={DownArrowLink}
              onClick={() => setThumb((a) => Math.min(styles[style].photos.length - 1, a + 1))}
              cur="s-resize"
            />
          </ArrowContainer>
        </ArrowDivV>
      ) : (
        <ArrowDivV>
          <ArrowContainer vis={false}>
            <Arrow
              src={DownArrowLink}
              cur="default"
            />
          </ArrowContainer>
        </ArrowDivV>
      )}
    </ThumbnailDiv>
  );
}

export default Thumbnails;
