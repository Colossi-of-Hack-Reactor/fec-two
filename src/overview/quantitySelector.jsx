import React from 'react';
import { PropTypes } from 'prop-types';
import Select from 'react-select';

function QuantitySelector(props) {
  const {
    quantity, setQuantity, size, style, styles,
  } = props;

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

QuantitySelector.propTypes = {
  quantity: PropTypes.shape({
    label: PropTypes.number,
    value: PropTypes.number,
  }),
  setQuantity: PropTypes.func.isRequired,
  size: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  style: PropTypes.number.isRequired,
  styles: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

QuantitySelector.defaultProps = {
  quantity: PropTypes.any,
  size: PropTypes.any,
};

export default QuantitySelector;
