const requestEvents = requestEventsAsync => async (dispatch, getState) => {
  if (!getState().timer.isStarted) {
    return;
  }

  const {events, shardIterator} = await requestEventsAsync(getState().shardIterator);
  dispatch({
    type: 'ADD_CHUNK',
    payload: {
      events,
      shardIterator}});
  const PAUSE_IN_MS = 1000;
  await wait(PAUSE_IN_MS);
  dispatch(requestEvents(requestEventsAsync));
};

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

export {requestEvents};
