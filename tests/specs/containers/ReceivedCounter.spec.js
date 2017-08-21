import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ReceivedCounter from '../../../src/containers/ReceivedCounter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
  eventCounts: [1,2,4],
};

describe('ReceivedCounter', () => {
  function receivedCounter(store) {
    return mount(<Provider store={store}><ReceivedCounter id="ReceivedCounter"/></Provider>);
  }

  it('renders self and subcomponents', () => {
    const counterWrapper = receivedCounter(mockStore(initialState));
    expect(counterWrapper).to.have.lengthOf(1);
  });

  it('displays total received events', () => {
    const counterWrapper = receivedCounter(mockStore(initialState));
    expect(counterWrapper.text()).to.be.eq('Total received: 7');
  });
});
