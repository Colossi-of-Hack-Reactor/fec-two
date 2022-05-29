import React from 'react';
import { PropTypes } from 'prop-types';
import {
  StyleDiv, StyleGrid, StyleImage, Check, WhiteBG,
} from './overviewStyled.js';
import { CheckMarkLink } from './overviewAssets.js';

function StyleSelector(props) {
  const { style, setStyle, styles } = props;

  if (styles[style].photos[0].url !== null) {
    return (
      <>
        <span>
          Style:
          {' '}
          {styles[style].name}
        </span>
        <StyleGrid>
          {styles.map((s, i) => (
            <StyleDiv key={s.style_id}>
              <StyleImage
                className={i === style ? 'selected' : null}
                src={s.photos[0].thumbnail_url}
                onClick={() => setStyle(i)}
                data-testid={`style-${i}`}
              />
              {i === style
                ? (
                  <>
                    <WhiteBG />
                    <Check src={CheckMarkLink} alt="check" />
                  </>
                ) : ''}
            </StyleDiv>
          ))}
        </StyleGrid>
      </>
    );
  }

  return null;
}

StyleSelector.propTypes = {
  style: PropTypes.number.isRequired,
  setStyle: PropTypes.func.isRequired,
  styles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default StyleSelector;
