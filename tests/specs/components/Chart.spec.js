import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';

import Chart from '../../../src/components/Chart';


describe('(Component) Chart', () => {
  function chart(props) {
    const defaultProps = {
      id: 'chart',
      eventCounts: [1]
    };
    return shallow(<Chart {...Object.assign(defaultProps, props)} />);
  }

  it('renders without exploding', () => {
    const wrapper = chart();
    expect(wrapper).to.have.length(1);
  });

  it('renders all bars', () => {
    const wrapper = chart({eventCounts: [1,2,3]});
    expect(wrapper.find('.DebuggerGraph-plotBar')).to.have.length(3);
  });

  it('determines correct bar height', () => {
    const wrapper = chart({eventCounts: [150, 169, 30]});
    const bars = wrapper.find('.DebuggerGraph-plot');
    expect(bars.childAt(0).props().style.height).to.be.equal('169px');
    expect(bars.childAt(1).props().style.height).to.be.equal('190px');
    expect(bars.childAt(2).props().style.height).to.be.equal('34px');
  });

  it('determines correct bar height when 0 events', () => {
    const wrapper = chart({eventCounts: [0]});
    const bars = wrapper.find('.DebuggerGraph-plot');
    expect(bars.childAt(0).props().style.height).to.be.equal('0px');
  });
});
