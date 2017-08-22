import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';

import reducer from  '../../src/reducers';

const initialState = {
  events: [],
  timer: {
    buttonText: 'start',
    isStarted: false,
  },
  eventCounts: [],
  sentEventsCount: 0
};

describe('reducer', () => {
  it('adds events to store', () => {
    const action = {
      payload: {events:[{id:1,event:'e1'}], shardIterator: 'asd'},
      type: 'ADD_CHUNK'
    }
    const newState = reducer(initialState, action);
    expect(newState.events).to.have.lengthOf(1);
    expect(newState.eventCounts).to.be.deep.equal([1]);
    expect(newState.shardIterator).to.be.equal('asd');
  });

  it('starts timer', () => {
    const action = {
      type: 'TOGGLE_TIMER'
    }
    const newState = reducer(initialState, action);
    expect(newState.timer.buttonText).to.be.equal('stop');
    expect(newState.timer.isStarted).to.be.equal(true);
    expect(newState.shardIterator).to.be.equal(null);
  });

  it('toogle timer state', () => {
    const action = {
      type: 'TOGGLE_TIMER'
    }
    
    const newState = reducer({
      events: [],
      timer: {
        buttonText: 'stop',
        isStarted: true,
      },
      eventCounts: [],
    }, action);
    expect(newState.timer.buttonText).to.be.equal('start');
    expect(newState.timer.isStarted).to.be.equal(false);
    expect(newState.shardIterator).to.be.equal(null);
  });

  it('count sent events', () => {
    const action = {
      payload: {id:1,event:'e1'},
      type: 'EVENT_SENT'
    }
    const newState = reducer(initialState, action);
    expect(newState.sentEventsCount).to.be.equal(1);
  });
});
