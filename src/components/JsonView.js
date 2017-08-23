import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view'

class List extends Component{
  render() {
    if (!this.props.src) return null;
    
    return (
      <div id={this.props.id} className="EventDetail">
        <div id="CloseDetailWrapper">
           <button id='CloseDetailEl' type="button" onClick={this.props.onClick}>
              X
            </button>
        </div>
        <ReactJson src={this.props.src} />
      </div>
    );
  }
}

List.propTypes = {
  id: PropTypes.string,
  events: PropTypes.array,
  onClick: PropTypes.func
};

export default List;
