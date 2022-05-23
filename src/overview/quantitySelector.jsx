import React from 'react';

function QuantitySelector(props) {
  const { setQuantity, size, style, styles } = props;

  return (
    <label>
      Select Quantity
      {' '}
      <select
        name="quantity"
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
        disabled={size === null}
      >
        {size === null || styles[style].skus[size] === undefined ? <option>-</option>
          : Array(Math.min(15, styles[style].skus[size].quantity))
            .fill(0).map((v, i) => i + 1).map((q) => (
              <option key={q} value={q}>{q}</option>
            ))}
      </select>
    </label>
  );
}

export default QuantitySelector;
