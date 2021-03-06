const startTimer = () => ({
  buttonText: 'stop',
  isStarted: true,
});

const stopTimer = () => ({
  buttonText: 'start',
  isStarted: false,
});

function reducer(state, action){
  const EVENTS_LIMIT = 11;
  switch (action.type) {
    case 'ADD_CHUNK':
      return {
        ...state,
        events: [...action.payload.events, ...state.events].slice(0, EVENTS_LIMIT),
        eventCounts: [...state.eventCounts, action.payload.events.length],
        shardIterator: action.payload.shardIterator,
      };
    case 'TOGGLE_TIMER':
      return {
        ...state,
        timer: state.timer.isStarted ? stopTimer() : startTimer(),
        shardIterator: null,
      };
    case 'EVENT_SENT':
      return {
        ...state,
        sentEventsCount: state.sentEventsCount + 1,
      };
    case 'SHOW_EVENT':
      return {
        ...state,
        currentEvent: state.events.find((element) => element.id === action.payload.id),
      };
    default:
      return state;
  }
}

export default reducer;
