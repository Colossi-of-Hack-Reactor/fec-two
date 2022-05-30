import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Thumbnail, ThumbnailImg, ThumbnailDiv, ArrowContainer, Arrow, ArrowDivV,
} from './overviewStyled.js';
import { noImageLink, UpArrowLink, DownArrowLink } from './overviewAssets.js';

function Thumbnails(props) {
  const {
    style, styles, image, setImage, thumb, setThumb,
  } = props;

  return (
    <ThumbnailDiv>
      {styles[style].photos.length > 7 ? (
        <ArrowDivV>
          <ArrowContainer vis={thumb !== 6}>
            <Arrow
              src={UpArrowLink}
              onClick={() => setThumb((a) => Math.max(6, a - 1))}
              cur="n-resize"
              data-testid="upArrow"
            />
          </ArrowContainer>
        </ArrowDivV>
      ) : (
        <ArrowDivV>
          <ArrowContainer vis={false}>
            <Arrow
              src={UpArrowLink}
              cur="default"
              data-testid="upArrow"
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
            data-testid={`thumbnailImg-${i}`}
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
              data-testid="downArrow"
            />
          </ArrowContainer>
        </ArrowDivV>
      ) : (
        <ArrowDivV>
          <ArrowContainer vis={false}>
            <Arrow
              src={DownArrowLink}
              cur="default"
              data-testid="downArrow"
            />
          </ArrowContainer>
        </ArrowDivV>
      )}
    </ThumbnailDiv>
  );
}

Thumbnails.propTypes = {
  style: PropTypes.number.isRequired,
  styles: PropTypes.arrayOf(PropTypes.shape).isRequired,
  image: PropTypes.number.isRequired,
  setImage: PropTypes.func.isRequired,
  thumb: PropTypes.number.isRequired,
  setThumb: PropTypes.func.isRequired,
};

export default Thumbnails;
