import React from 'react';

function SizeSelector(props) {
  const { setSize, style, styles } = props;

  if (styles[style].skus.null) {
    return (
      <div>
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
            <option value="Select">
              OUT OF STOCK
            </option>
          </select>
        </label>
      </div>
    );
  }
  return (
    <div>
      <label>
        Select Size
        {' '}
        <select
          name="size"
          onChange={(e) => {
            setSize(e.target.value);
          }}
        >
          <option value="Select">
            Select
          </option>
          {Object.keys(styles[style].skus).map((sku, i) => (
            <option value={sku} key={sku}>
              {styles[style].skus[sku].size}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default SizeSelector;
