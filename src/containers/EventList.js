import {connect} from 'react-redux';
import List from '../components/List';

function mapStateToProps(state){
  return {
    events: state.events,
    currentEvent: state.currentEvent
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: (id) => () => dispatch({type: 'SHOW_EVENT', payload: {id}})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
