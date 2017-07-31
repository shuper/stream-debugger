import {connect} from 'react-redux'
import Button from '../components/Button'


function mapStateToProps(state) {
  return {
    text: state.timer.buttonText,
    isStarted: state.timer.isStarted
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: () => {
      dispatch({ type: 'TOGGLE_TIMER' });
      dispatch({ type: 'TICK' });
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button);
