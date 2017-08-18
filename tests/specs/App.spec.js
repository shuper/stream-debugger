import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon';

import App from  '../../src/App';
import store from '../../src/store';
import * as fetcher from '../../src/actions/fetcher';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
  events: [],
  timer: {
    buttonText: 'start',
    isStarted: false,
  },
  eventCounts: [],
};

async function requestEventsAsync() {
  const id = Math.random().toString();
  return {events: [{
    id,
    messageId: id,
    type: 'track',
    event: 'Video Heartbeat 1'}],
  };
}

describe('App', () => {
  function app(store) {
    return mount(<Provider store={store}><App requestEventsAsync={requestEventsAsync}/></Provider>);
  }

  it('renders self and subcomponents', () => {
    const appWrapper = app(mockStore(initialState));
    expect(appWrapper.find('#App')).to.have.lengthOf(1);
    expect(appWrapper.find('#chart')).to.have.lengthOf(1);
    expect(appWrapper.find('#events-list')).to.have.lengthOf(1);
    expect(appWrapper.find('#switcher')).to.have.lengthOf(1);
  });


  it('affects all subcomponents', () => {
    const appWrapper = app(store);
    const requestEvents = sinon.stub(fetcher, 'requestEvents').callsFake(() => {
      return {
        "payload": {
          "events": [ { '0': { one: 1 }, id: 123 } ],
          "shardIterator": undefined
        },
        "type": "ADD_CHUNK"
      };
    });
    const switcher = appWrapper.find('#switcher');
    expect(appWrapper.find('.DebuggerListItem')).to.have.lengthOf(0);
    expect(switcher.simulate('click'));
    expect(switcher.text()).to.be.eq('stop');
    expect(appWrapper.find('.DebuggerListItem')).to.have.lengthOf(1);
    expect(appWrapper.find('.DebuggerGraph-plotBar')).to.have.lengthOf(1);
    requestEvents.restore();
  });
});
