import { createStore } from 'redux'
import reducer from './reducers'

const initialState = {
  events:[],
  timer: { buttonText:'start', isStarted: false },
  eventCounts: []
};

export default createStore(reducer, initialState);
