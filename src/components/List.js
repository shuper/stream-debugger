import React, { Component } from 'react'

class List extends Component{
  render() {
    const { events } = this.props;
    const listItems = events.map((event) => {
      const e = JSON.parse(event);
      return <li id={"id-" + e.messageId} key={e.messageId}>{event}</li>
    });

     return (
       <ul>{listItems}</ul>
     );
  }
}

export default List;
