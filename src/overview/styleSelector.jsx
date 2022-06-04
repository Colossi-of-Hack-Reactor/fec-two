import React from 'react';
import { PropTypes } from 'prop-types';
import {
  StyleDiv, StyleGrid, StyleImage, Check, WhiteBG, StyleNameDiv,
} from './overviewStyled.js';
import { CheckMarkLink } from './overviewAssets.js';

function StyleSelector(props) {
  const { style, setStyle, styles } = props;

  if (styles[style].photos[0].url !== null) {
    return (
      <>
        <StyleNameDiv data-testid="style">
          <b>STYLE &gt; </b>
          {styles[style].name}
        </StyleNameDiv>
        <StyleGrid data-testid="styleGrid">
          {styles.map((s, i) => (
            <StyleDiv key={s.style_id}>
              <StyleImage
                className={i === style ? 'selected' : null}
                src={s.photos[0].thumbnail_url}
                onClick={() => setStyle(i)}
                data-testid={`style-${i}`}
                alt={s.name}
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
