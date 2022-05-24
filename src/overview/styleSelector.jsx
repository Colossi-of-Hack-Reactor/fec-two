import React from 'react';
import styled from 'styled-components';

const TD = styled.td`
  position: relative
`;

const StyleImage = styled.img`
  cursor: pointer;
  height: 100px;
  width: 100px;
  border-radius: 50%;
`;

const Check = styled.span`
  position: absolute;
  top: 10%;
  left: 10%;
  text-shadow: 2px 2px;
`;

function StyleSelector(props) {
  const { style, setStyle, styles } = props;
  const stylesArray = [];

  for (let i = 0; i < styles.length; i += 4) {
    stylesArray.push(styles.slice(i, i + 4));
  }

  return (
    <>
      <span>
        Style:
        {' '}
        {styles[style].name}
      </span>
      <table>
        <tbody>
          {stylesArray.map((row, i) => (
            <tr key={i}>
              {row.map((s, j) => (
                <TD key={s.style_id}>
                  <StyleImage
                    className={4 * i + j === style ? 'selected' : null}
                    key={s.style_id}
                    src={s.photos[0].thumbnail_url}
                    onClick={() => setStyle(4 * i + j)}
                  />
                  {4 * i + j === style ? <Check>☑️</Check> : ''}
                </TD>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default StyleSelector;
