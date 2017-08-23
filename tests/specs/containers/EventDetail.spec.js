import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import EventDetail from '../../../src/containers/EventDetail';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
  currentEvent: {id:1, event: 'e1'}
};

describe('EventDetail', () => {
  function eventDetail(store) {
    return mount(<Provider store={store}><EventDetail id="EventDetail"/></Provider>);
  }

  it('should show itself', () => {
    const store = mockStore(initialState);
    const subject = eventDetail(store);
    expect(subject).to.have.lengthOf(1);
  });

  it('should dispatch SHOW_EVENT action when close element is clicked', () => {
    const store = mockStore(initialState);
    const subject = eventDetail(store);
    subject.find('#CloseDetailEl').simulate('click');
    expect(store.getActions()[0].type).to.eql("SHOW_EVENT");
    expect(store.getActions()[0].payload.id).to.eql(null);
  });
});