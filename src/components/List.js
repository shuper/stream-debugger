import React, { Component } from 'react'

class List extends Component{
  render() {
    const { events } = this.props;
    const listItems = events.map((event) => {
      return <li className="DebuggerListItem" id={"id-" + event.id} key={event.id}>{event.event}</li>
    });

     return (
       <ul className="DebuggerList">{listItems}</ul>
     );
  }
}

export default List;
