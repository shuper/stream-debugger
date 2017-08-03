const requestEvents = (requestEventsAsync) => async (dispatch, getState) => {
  if (!getState().timer.isStarted) return;

  const {events, shardIterator} = await requestEventsAsync(getState().shardIterator);
  dispatch({type: 'ADD_CHUNK', payload: {events, shardIterator}});

  await wait(1000);
  dispatch(requestEvents(requestEventsAsync));
};

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

export {requestEvents};