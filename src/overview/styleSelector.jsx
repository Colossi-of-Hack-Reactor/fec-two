import React from 'react';

function StyleSelector(props) {
  const { setStyle, styles } = props;

  return (
    <label>
      Style
      {' '}
      <select
        name="style"
        onChange={(e) => {
          setStyle(e.target.value);
        }}
      >
        {styles.map((s, i) => (
          <option value={i} key={s.name}>
            {s.name}
          </option>
        ))}
      </select>
    </label>
  );
}

export default StyleSelector;
