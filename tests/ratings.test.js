import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import Ratings from '../src/ratings/ratings.jsx';

describe('A suite', function() {

  it('should test the button in ratings', function() {
    const wrapper = shallow(<Ratings />);

    expect(wrapper.find('.clicks-0').length).toEqual(1);
    wrapper.find('button').simulate('click')
    expect(wrapper.find('.clicks-1').length).toEqual(1);
  });
});