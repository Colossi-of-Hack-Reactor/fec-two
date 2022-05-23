import React, { useState, useEffect, useMemo } from 'react';

export default class Size extends React.Component {
  static sizes = ["A size too small", "1/2 a size too small", "Perfect", "1/2 a size too big", "A size too wide"];
  render() {
    return (
      <div>
        Size {Size.sizes[this.props.option]}
        {/* React.createElement(withRangeOption(Size)) */}
      </div>
    )
  }
};

function withRangeOption(Component) {

  return class extends React.Component {
    const[option, setOption] = useState(0);

    handleChange = (e) => {
      setOption(e.target.value)
    };
    render() {
      return (
        <React.Fragment>
          <input
            type="range"
            min={0}
            max={4}
            value={this.state.option}
            onChange={this.handleChange}
          />
          <Component option={this.state.option} />
        </React.Fragment>
      )
    }
  }
}