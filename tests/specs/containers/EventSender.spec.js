import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import * as requester from '../../../src/lib/requester';
import EventSender from '../../../src/containers/EventSender';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
  sentEventsCount: 0,
};

describe('EventSender', () => {
  function eventSender(store) {
    return mount(<Provider store={store}><EventSender id="EventSender"/></Provider>);
  }

  let sendEventToKinesis;
  beforeEach(() => {
    sendEventToKinesis = sinon.stub(requester, 'sendEventToKinesis');
  });

  afterEach(() => {
    sendEventToKinesis.restore();
  });

  it('renders self and subcomponents', () => {
    const subject = eventSender(mockStore(initialState));
    expect(subject).to.have.lengthOf(1);
    expect(subject.find('.App-header')).to.have.lengthOf(1);
    expect(subject.find('.App-header > .App-logo')).to.have.lengthOf(1);
    expect(subject.find('.App-header > .HeaderTitle')).to.have.lengthOf(1);
  });

  it('should call sendEventToKinesis when click', () => {
    const subject = eventSender(mockStore(initialState));
    subject.simulate('click');
    expect(sendEventToKinesis.calledOnce).to.be.true;
  });

  it('should call sendEventToKinesis when mouse move', () => {
    const subject = eventSender(mockStore(initialState));
    subject.simulate('mouseMove', {screenX: 1, screenY: 0});
    expect(sendEventToKinesis.calledOnce).to.be.true;
  });

  it('should dispatch EVENT_SENT action when click', () => {
    const store = mockStore(initialState);
    const subject = eventSender(store);
    subject.simulate('click');
    expect(store.getActions()[0].type).to.eql("EVENT_SENT");
    expect(store.getActions()[0].payload.event).to.eql("header click");
  });

  it('should dispatch EVENT_SENT action when mouse move', () => {
    const store = mockStore(initialState);
    const subject = eventSender(store);
    subject.simulate('mouseMove', {screenX: 1, screenY: 0});
    expect(store.getActions()[0].type).to.eql("EVENT_SENT");
    expect(store.getActions()[0].payload.event).to.eql("header mouse move: (1, 0)");
  });
});
