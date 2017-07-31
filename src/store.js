import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import {fetcher} from './middlewares'

const initialState = {
  events:[],
  timer: { buttonText:'start', isStarted: false },
  eventCounts: []
};

export default createStore(reducer, initialState, applyMiddleware(fetcher));
