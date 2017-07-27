import React, { Component } from 'react'

class List extends Component{
  render() {
    const { events } = this.props;
    const listItems = events.map((event) => {
      return <li id={"id-" + event.messageId} key={event.messageId}>{event.event}</li>
    });

     return (
       <ul>{listItems}</ul>
     );
  }
}

export default List;
