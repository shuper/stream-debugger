import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Chart extends Component {
  renderBar(count, idx) {
    return (
      <div id={"plotBar" + idx}
        className="DebuggerGraph-plotBar"
        style={{height: this.height(count)}}
        key={"plotBar" + idx}
        title={count.toString()}/>
    );
  }

  height(count) {
    if (this.max === 0) return '0px';
    const bar_height = 190;
    return `${(count * bar_height / this.max).toFixed()}px`;
  }

  render() {
    const {eventCounts} = this.props;
    this.max = Math.max(...eventCounts);
    const bars = eventCounts.map((e, i) => this.renderBar(e, i));

    return (
      <div id={this.props.id} className="DebuggerGraph">
        <div className="DebuggerGraph-plot">
          {bars}
        </div>
      </div>
    );
  }
}

Chart.propTypes = {
  id: PropTypes.string,
  eventCounts: PropTypes.array,
};

export default Chart;
