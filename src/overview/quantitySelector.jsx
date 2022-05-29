import React from 'react';
import { PropTypes } from 'prop-types';

function QuantitySelector(props) {
  const {
    setQuantity, size, style, styles, selectRef,
  } = props;

  return (
    <div>
      <select
        name="quantity"
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
        disabled={size === 'Select'}
      >
        {size === 'Select' || styles[style].skus[size] === undefined ? <option>-</option>
          : Array(Math.min(15, styles[style].skus[size].quantity))
            .fill(0).map((v, i) => i + 1).map((q) => (
              <option key={q} value={q}>{q}</option>
            ))}
      </select>
    </div>
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
