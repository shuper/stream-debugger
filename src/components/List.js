import React, {Component} from 'react';
import PropTypes from 'prop-types';

class List extends Component{
  render() {
    const {events} = this.props;
    const listItems = events.map(event =>
      <li className="DebuggerListItem" id={`id-${event.id}`} key={event.id}>{event.event}</li>
    );

    return (
      <ul id={this.props.id} className="DebuggerList">{listItems}</ul>
    );
  }
}

List.propTypes = {
  id: PropTypes.string,
  events: PropTypes.array,
};

export default List;
