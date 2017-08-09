import {connect} from 'react-redux';
import Chart from '../components/Chart';

function mapStateToProps(state){
  return {eventCounts: state.eventCounts};
}

export default connect(mapStateToProps)(Chart);
