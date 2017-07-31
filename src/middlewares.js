import {requestEventsAsync} from './requester'


const fetcher = store => next => action => {
  if (action.type !== "TICK" || !store.getState().timer.isStarted) {
    return next(action)
  }

  requestEventsAsync()
    .then(events => next({type: 'ADD_CHUNK', payload: events}))
    .then(() => setTimeout(() => store.dispatch({type: 'TICK'}), 1000));
  return () => {}
};

export {fetcher};