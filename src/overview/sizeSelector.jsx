import React from 'react';
import { PropTypes } from 'prop-types';
import { OverviewSelect } from './overviewStyled.js';

function SizeSelector(props) {
  const {
    setSize, style, styles, selectRef,
  } = props;

  if (styles[style].skus.null) {
    return (
      <OverviewSelect
        name="size"
        disabled
        data-testid="sizeSelect"
      >
        <option value="Select">
          OUT OF STOCK
        </option>
      </OverviewSelect>
    );
  }
  return (
    <OverviewSelect
      name="size"
      onChange={(e) => {
        setSize(e.target.value);
      }}
      ref={selectRef}
      data-testid="sizeSelect"
    >
      <option value="Select">
        Select Size
      </option>
      {Object.keys(styles[style].skus).map((sku) => (
        <option value={sku} key={sku}>
          {styles[style].skus[sku].size}
        </option>
      ))}
    </OverviewSelect>
  );
}

SizeSelector.propTypes = {
  size: PropTypes.string.isRequired,
  setSize: PropTypes.func.isRequired,
  style: PropTypes.number.isRequired,
  styles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectRef: PropTypes.shape({
    current: PropTypes.shape(),
  }).isRequired,
};

export default SizeSelector;
