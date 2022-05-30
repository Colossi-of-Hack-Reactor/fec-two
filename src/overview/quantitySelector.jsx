import React from 'react';
import { PropTypes } from 'prop-types';
import { OverviewSelect } from './overviewStyled.js';

function QuantitySelector(props) {
  const {
    setQuantity, size, style, styles,
  } = props;

  return (
    <OverviewSelect
      name="quantity"
      onChange={(e) => {
        setQuantity(e.target.value);
      }}
      disabled={size === 'Select'}
      data-testid="qtySelect"
    >
      {size === 'Select' || styles[style].skus[size] === undefined ? <option>-</option>
        : Array(Math.min(15, styles[style].skus[size].quantity))
          .fill(0).map((v, i) => i + 1).map((q) => (
            <option key={q} value={q}>{q}</option>
          ))}
    </OverviewSelect>
  );
}

QuantitySelector.propTypes = {
  setQuantity: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  style: PropTypes.number.isRequired,
  styles: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default QuantitySelector;
