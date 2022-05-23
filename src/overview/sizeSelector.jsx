import React from 'react';

function SizeSelector(props) {
  const { setSize, style, styles } = props;

  if (styles[style].skus.null) {
    return (
      <label>
        Select Size
        {' '}
        <select
          name="size"
          onChange={(e) => {
            setSize(e.target.value);
          }}
          disabled
        >
          <option value={null}>
            OUT OF STOCK
          </option>
        </select>
      </label>
    );
  }
  return (
    <label>
      Select Size
      {' '}
      <select
        name="size"
        onChange={(e) => {
          setSize(e.target.value);
        }}
      >
        <option value={null}>
          Select
        </option>
        {Object.keys(styles[style].skus).map((sku, i) => (
          <option value={sku} key={sku}>
            {styles[style].skus[sku].size}
          </option>
        ))}
      </select>
    </label>
  );
}

export default SizeSelector;
