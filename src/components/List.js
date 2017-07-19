import React, { Component } from 'react'

class List extends Component{

  render() {
    const { events } = this.props;
    const listItems = events.map((event) =>
     <li key={event.id.toString()}>
       {event.event}
     </li>)

     return (
       <ul>{listItems}</ul>
     );
  }
};

export default List;
