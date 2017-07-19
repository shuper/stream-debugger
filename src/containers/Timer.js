import { connect } from 'react-redux'
import Button from '../components/Button'

function requestEvents(){
  const uid = Number(new Date());
  return [
    { id: uid, type: 'track', event: `Video Heartbeat ${uid}`, source: 'android' },
    { id: uid + 1, type: 'track', event: `Video Heartbeat ${uid + 1}`, source: 'android' },
    { id: uid + 2 , type: 'track', event: `Video Heartbeat ${uid + 2}`, source: 'android' }
  ];
}

function loop(dispatch){
  dispatch({ type: 'ADD_CHUNK', payload: requestEvents() });

  const id = setTimeout(() => {loop(dispatch)}, 1000);
  dispatch({ type: 'TICK', payload: { id } });
}

function mapStateToProps(state){
  return {
    text: state.timer.buttonText,
    isStarted: state.timer.isStarted,
    timerID: state.timer.id
  }
}

function mapDispatchToProps(dispatch){
  return {
    onClick: ({isStarted, timerID}) => {
      dispatch({ type: 'TOGGLE_TIMER' });
      if (isStarted) {
        clearTimeout(timerID);
      } else {
        loop(dispatch);
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button);
