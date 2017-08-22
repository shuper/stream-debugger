import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

const initialState = {
  events: [],
  timer: {
    buttonText: 'start',
    isStarted: false,
  },
  eventCounts: [],
  sentEventsCount: 0
};

export default createStore(reducer, initialState, applyMiddleware(thunk));
