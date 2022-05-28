import React from 'react';
import Select from 'react-select';

function SizeSelector(props) {
  const { size, setSize, style, styles, selectRef } = props;

  if (styles[style].skus.null) {
    return (
      <div>
        <label>
          Select Size
          {' '}
          <Select
            name="size"
            isDisabled
            value={null}
            options={[{
              value: 'Select', label: 'OUT OF STOCK',
            }]}
            placeholder="OUT OF STOCK"
          />
        </label>
      </div>
    );
  }

  const options = Object.keys(styles[style].skus).map((sku) => (
    {
      value: sku,
      label: styles[style].skus[sku].size,
    }
  ));

  return (
    <Select
      placeholder="SELECT SIZE"
      name="size"
      value={size}
      onChange={setSize}
      options={options}
      ref={selectRef}
      openMenuOnFocus
    />
  );
}

export default SizeSelector;
