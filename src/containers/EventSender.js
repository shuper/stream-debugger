import {connect} from 'react-redux';
import Header from '../components/Header';
import {sendEventToKinesis} from '../lib/requester';
import {generateEvents} from '../lib/eventGenerator';

function sendEvent(eventName, dispatch){
  const event = generateEvents(1, eventName)[0];
  sendEventToKinesis(event)
  dispatch({type: 'EVENT_SENT', payload: event});
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onClick: () => sendEvent('header click', dispatch),
    onMouseMove: (e) => sendEvent(`header mouse move: (${e.screenX}, ${e.screenY})`, dispatch),
  };
}

export default connect(
  state => {return {}},
  mapDispatchToProps
)(Header);
