import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { expect } from 'chai';
import nock from 'nock'

import {requestEvents} from '../../../src/actions/fetcher'
import requestEventsAsync from '../../../src/lib/requester'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('creates ADD_CHUNK when requesting events has been done', () => {
    const events = [{one: 1}];

    nock('http://127.0.0.1:8881/')
      .post('/?delay=0.5', body => true).times(2)
      .reply(200, {Records: [{Data: btoa(JSON.stringify(events)), SequenceNumber: 123}] });

    const expectedActions = [
      {
        "payload": {
          "events": [ { '0': { one: 1 }, id: 123 } ],
          "shardIterator": undefined
        },
        "type": "ADD_CHUNK"
      }
    ];
    const store = mockStore({
      events:[],
      timer: { buttonText:'start', isStarted: true },
      eventCounts: []
    });

    const action = requestEvents(requestEventsAsync);
    return store.dispatch(action).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
      store.dispatch({type: 'TOGGLE_TIMER'})
    })
  })
});
