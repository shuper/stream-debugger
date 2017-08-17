import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';

import List from '../../../src/components/List';


describe('(Component) List', () => {
  function list(props) {
    const defaultProps = {
      events: [{id:1, event: 'e1'}, {id:2, event: 'e2'}]
    };
    return shallow(<List {...Object.assign(defaultProps, props)} />);
  }

  it('renders without exploding', () => {
    const wrapper = list();
    expect(wrapper).to.have.length(1);
    expect(wrapper.find('.DebuggerList')).to.have.length(1)
  });

  it('renders all events', () => {
    const wrapper = list({events: [{id:1, event: 'e1'}, {id:2, event: 'e2'}]});
    expect(wrapper.find('.DebuggerListItem')).to.have.length(2);
  });
});
