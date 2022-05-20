import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import Overview from '../src/overview/overview.jsx';

describe('A suite', function() {

  it('should test the button', function() {
    const wrapper = shallow(<Overview />);
    console.log('wrapper find p text before click', wrapper.find('p').text());
    expect(wrapper.find('p').text()).toEqual('Overview:0');
    wrapper.find('button').simulate('click')
    console.log('wrapper find p text after click', wrapper.find('p').text());
    expect(wrapper.find('p').text()).toEqual('Overview:1');

  });

});