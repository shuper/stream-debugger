import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SentCounter from '../../../src/containers/SentCounter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
  sentEventsCount: 5,
};

describe('SentCounter', () => {
  function sentCounter(store) {
    return mount(<Provider store={store}><SentCounter id="SentCounter"/></Provider>);
  }

  it('renders self and subcomponents', () => {
    const counterWrapper = sentCounter(mockStore(initialState));
    expect(counterWrapper).to.have.lengthOf(1);
  });

  it('displays total sent events', () => {
    const counterWrapper = sentCounter(mockStore(initialState));
    expect(counterWrapper.text()).to.be.eq('Total sent: 5');
  });
});
