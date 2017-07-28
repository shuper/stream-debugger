import React, {Component} from 'react'

class Chart extends Component {

  renderBar(count, idx) {

    return (
      <div id={idx.toString()}
           className="DebuggerGraph-plotBar"
           style={{height: this.height(count)}}
           key={idx.toString()}
           title={count.toString()}/>
    )
  }

  BAR_HEIGHT = 190;
  height(count) {
    return (count * this.BAR_HEIGHT / this.max)  + "px"
  }

  render() {
    const {eventCounts} = this.props;
    this.max = Math.max(...eventCounts) + 1;
    const bars = eventCounts.map((e, i) => this.renderBar(e, i));

    return (
      <div className="DebuggerGraph">
        <div className="DebuggerGraph-plot">
          {bars}
        </div>
      </div>
    )
  }
}

export default Chart;
