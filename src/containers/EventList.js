import { connect } from 'react-redux'
import List from '../components/List'

function mapStateToProps(state, ownProps){

  return {
    events: state
  }
}

export default connect(
  mapStateToProps,
  dispatch => ({})
)(List);
