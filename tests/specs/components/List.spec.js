import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';

import List from '../../../src/components/List';


describe('(Component) List', () => {
  let onClick;
  beforeEach(() => {
    onClick = sinon.spy();
  });

  function list(props) {
    const defaultProps = {
      events: [{id:1, event: 'e1'}, {id:2, event: 'e2'}],
      onClick: sinon.stub().returns(onClick)
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

  it('should call on click handler when clicked on list item', () => {
    const wrapper = list();
    wrapper.find('#id-1').simulate('click');
    expect(onClick.calledOnce).to.be.true;
  });


  it('should select current event when current event exists', () => {
    const wrapper = list({currentEvent: {id:1, event: 'e1'}});
    expect(wrapper.find('#id-1').hasClass('selected')).to.equal(true)
  });
});
