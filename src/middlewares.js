import {requestKinesis} from './requester'

const fetcher = store => next => action => {
  if (action.type !== "TICK" || !store.getState().timer.isStarted) {
    return next(action)
  }

  requestKinesis(store.getState().shardIterator)
    .then(({events, shardIterator}) => next({type: 'ADD_CHUNK', payload: {events, shardIterator}}))
    .then(() => setTimeout(() => store.dispatch({type: 'TICK'}), 1000));
  return () => {}
};

export {fetcher};