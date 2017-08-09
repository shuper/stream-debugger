import {connect} from 'react-redux';
import Button from '../components/Button';
import {requestEvents} from '../actions/fetcher';


function mapStateToProps(state) {
  return {
    text: state.timer.buttonText,
    isStarted: state.timer.isStarted,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onClick: () => {
      dispatch({type: 'TOGGLE_TIMER'});
      dispatch(requestEvents(ownProps.requestEventsAsync));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button);
