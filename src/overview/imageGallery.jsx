import React from 'react';
import styled from 'styled-components';

const TD = styled.td`
`;

const StyleImage = styled.img`
  cursor: pointer;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  margin: 4px;

  &.selected {
    margin: 0;
    border: 4px solid orange;
  }
`;

const ImageZoom = styled.img`
  height: 700px;
`;

function StyleSelector(props) {
  const { image, setImage, style, styles } = props;
  const stylesArray = [];

  for (let i = 0; i < styles[style].photos.length; i += 7) {
    stylesArray.push(styles[style].photos.slice(i, i + 7));
  }

  return (
    <>
      <table>
        <tbody>
          {stylesArray.map((row, i) => (
            <tr key={i}>
              {row.map((s, j) => (
                <TD key={j}>
                  <StyleImage
                    className={7 * i + j === image ? 'selected' : null}
                    key={7 * i + j}
                    src={s.thumbnail_url}
                    onClick={() => setImage(7 * i + j)}
                  />
                </TD>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <ImageZoom src={styles[style].photos[image].url} />
    </>
  );
}

export default StyleSelector;
