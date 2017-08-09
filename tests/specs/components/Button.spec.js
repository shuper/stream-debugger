import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';

import Button from '../../../src/components/Button';


describe('(Component) Button', () => {
  function button(props) {
    const defaultProps = {
      text: 'doom',
      onClick: undefined,
    };
    return shallow(<Button {...Object.assign(defaultProps, props)} />);
  }

  it('renders without exploding', () => {
    const wrapper = button();
    expect(wrapper).to.have.length(1);
    expect(wrapper.text()).to.be.equal('doom');
  });

  it('should call on click handler', () => {
    const onClick = sinon.spy();
    const wrapper = button({onClick});
    wrapper.simulate('click');
    expect(onClick.calledOnce).to.be.true;
  });
});
