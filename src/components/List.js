import React, { Component , PropTypes} from 'react'
// import {PropTypes} from 'react-redux'

class List extends Component{
  // static propTypes = {
  //   events: PropTypes.object.isRequired
  // };

  render() {
    const { events } = this.props;
    const listItems = events.map((event) =>
     <li key={event.id.toString()}>
       {event.event}
     </li>)

     console.log(listItems);
     return (
       <ul>{listItems}</ul>
     );
  }
};

export default List;
