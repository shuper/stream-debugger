import { connect } from 'react-redux'
import List from '../components/List'

function mapStateToProps(state){
  return {
    events: state.events
  }
}

export default connect(mapStateToProps)(List);
