import React from 'react';
import Select from 'react-select';

function QuantitySelector(props) {
  const { quantity, setQuantity, size, style, styles } = props;

  if (size === null || styles[style].skus[size.value] === undefined) {
    return (
      <Select
        placeholder="-"
        name="quantity"
        isDisabled
        value={null}
      />
    );
  }

  const options = Array(Math.min(15, styles[style].skus[size.value].quantity))
    .fill(0).map((v, i) => i + 1).map((q) => (
      {
        value: q,
        label: q,
      }
    ));

  return (
    <Select
      name="quantity"
      options={options}
      value={quantity}
      onChange={setQuantity}
    />
  );
}

export default QuantitySelector;
