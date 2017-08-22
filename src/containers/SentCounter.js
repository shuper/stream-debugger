import {connect} from 'react-redux';
import Label from '../components/Label';

function mapStateToProps(state){
  return {text: 'Total sent: ' + state.sentEventsCount};
}

export default connect(mapStateToProps)(Label);