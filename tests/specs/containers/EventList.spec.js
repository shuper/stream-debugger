import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import EventList from '../../../src/containers/EventList';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
  events: [{id:1, event: 'e1'}, {id:2, event: 'e2'}]
};

describe('EventList', () => {
  function eventList(store) {
    return mount(<Provider store={store}><EventList id="EventList"/></Provider>);
  }

  it('should dispatch SHOW_EVENT action when click on event', () => {
    const store = mockStore(initialState);
    const subject = eventList(store);
    subject.find('#id-1').simulate('click');
    expect(store.getActions()[0].type).to.eql("SHOW_EVENT");
    expect(store.getActions()[0].payload.id).to.eql(1);
  });
});
