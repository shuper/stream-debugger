import {connect} from 'react-redux';
import Label from '../components/Label';

function mapStateToProps(state){
  return {text: 'Total received: ' + state.eventCounts.reduce((a, b) => a + b, 0)};
}

export default connect(mapStateToProps)(Label);