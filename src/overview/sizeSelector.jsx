import React from 'react';
import { PropTypes } from 'prop-types';

function SizeSelector(props) {
  const { setSize, style, styles, selectRef } = props;

  if (styles[style].skus.null) {
    return (
      <div>
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
      </div>
    );
  }
  return (
    <div>
      <select
        name="size"
        onChange={(e) => {
          setSize(e.target.value);
        }}
        ref={selectRef}
      >
        <option value="Select">
          Select Size
        </option>
        {Object.keys(styles[style].skus).map((sku, i) => (
          <option value={sku} key={sku}>
            {styles[style].skus[sku].size}
          </option>
        ))}
      </select>
    </div>
  );
}

SizeSelector.propTypes = {
  size: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  setSize: PropTypes.func.isRequired,
  style: PropTypes.number.isRequired,
  styles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectRef: PropTypes.shape({
    current: PropTypes.shape(),
  }).isRequired,
};

SizeSelector.defaultProps = {
  size: PropTypes.any,
};

export default SizeSelector;
