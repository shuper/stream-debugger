import React, {Component} from 'react'

class Chart extends Component{
  render() {
    const { eventCounts } = this.props;
    const bars = eventCounts.map((count, idx) => {
    const b = count+"%";
     return <div className="Bar" style={{height:b}} key={idx.toString()}></div>
   })
    return <div className="Chart">{bars}</div>
  }
}

export default Chart;
