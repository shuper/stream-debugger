import {connect} from 'react-redux';
import JsonView from '../components/JsonView';

function mapStateToProps(state){
  return { src: state.currentEvent };
}

function mapDispatchToProps(dispatch) {
    return {
        onClick: () =>  dispatch({type: 'SHOW_EVENT', payload: {id: null}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JsonView);