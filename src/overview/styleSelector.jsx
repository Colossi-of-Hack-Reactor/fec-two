import React from 'react';
import styled from 'styled-components';

const StyleDiv = styled.div`
  display: grid;
  position: relative;
  align-items: center;
  justify-items: center;
`;

const StyleGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const StyleImage = styled.img`
  cursor: pointer;
  height: 100px;
  width: 100px;
  border-radius: 50%;
`;

const Check = styled.img`
  position: absolute;
  height: 100px;
  width: 100px;
  z-index: 2;
  opacity: 0.8;
`;

const WhiteBG = styled.span`
  position: absolute;
  background-color: rgba(255, 255, 255, .4);
  border-radius: 50%;
  height: 100px;
  width: 100px;
  z-index: 1;
`;

const checkmarkLink = '/assets/check-mark-circle-line.svg';

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
                    <Check src={checkmarkLink} alt="check" />
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

export default StyleSelector;
