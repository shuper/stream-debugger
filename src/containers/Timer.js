import { connect } from 'react-redux'
import Button from '../components/Button'

function loop(dispatch, onTick){
  onTick(dispatch, () => {
    const id = setTimeout(() => {loop(dispatch, onTick)}, 1000);
    dispatch({ type: 'TICK', payload: { id } });
  })
}

function mapStateToProps(state){
  return {
    text: state.timer.buttonText,
    isStarted: state.timer.isStarted,
    timerID: state.timer.id
  }
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    onClick: ({isStarted, timerID}) => {
      dispatch({ type: 'TOGGLE_TIMER' });
      if (isStarted) {
        clearTimeout(timerID);
      } else {
        loop(dispatch, ownProps.onTick);
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button);
