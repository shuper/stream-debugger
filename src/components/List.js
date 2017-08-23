import React, {Component} from 'react';
import PropTypes from 'prop-types';

class List extends Component{
  render() {
    const {events, onClick, currentEvent} = this.props;
    const listItems = events.map(event => {
        const className = currentEvent && event.id === currentEvent.id ? "DebuggerListItem selected" : "DebuggerListItem";
        return <li className={className} id={`id-${event.id}`} key={event.id} onClick={onClick(event.id)}>{event.event}</li>;
      }
    );

    return (
      <ul id={this.props.id} className="DebuggerList">{listItems}</ul>
    );
  }
}

List.propTypes = {
  id: PropTypes.string,
  events: PropTypes.array,
  onClick: PropTypes.func
};

export default List;
