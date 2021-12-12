import React from "react";
import ReactDOM from "react-dom";
import StopwatchDisplay from "./StopwatchDisplay.jsx";
import {SocketContext, socket} from './socket';

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      running: false,
      currentTimeMs: 0,
      currentTimeSec: 0,
      currentTimeMin: 0,
      fin: this.props.fin,
      debut: this.props.debut
    };
  }

  formatTime = (val, ...rest) => {
    let value = val.toString();
    if (value.length < 2) {
      value = "0" + value;
    }
    if (rest[0] === "ms" && value.length < 3) {
      value = "0" + value;
    }
    return value;
  };

  start = () => {
    if (!this.state.running && this.props.debut) {
      this.setState({ running: true });
      this.watch = setInterval(() => this.pace(), 10);
      console.log(this.state.currentTimeMin, this.state.currentTimeSec, this.state.currentTimeMs)
    }
  };

  stop = () => {
    console.log("stop")
    if (this.state.running) {
      this.setState({ running: false });
      clearInterval(this.watch);
      socket.emit('fin-autoClick', [this.state.currentTimeMin, this.state.currentTimeSec, this.state.currentTimeMs]);
    }
  };

  pace = () => {
    this.setState({ currentTimeMs: this.state.currentTimeMs + 1 });
    if (this.state.currentTimeMs >= 100) {
      this.setState({ currentTimeSec: this.state.currentTimeSec + 1 });
      this.setState({ currentTimeMs: 0 });
    }
    if (this.state.currentTimeSec >= 60) {
      this.setState({ currentTimeMin: this.state.currentTimeMin + 1 });
      this.setState({ currentTimeSec: 0 });
    }
  };

  reset = () => {
    this.setState({
      currentTimeMs: 0,
      currentTimeSec: 0,
      currentTimeMin: 0
    });
  };

  render() {
    return (
    <div className="chrono">
        <div className={"stopwatch"}>
            { this.props.debut && !this.props.fin ? this.start() : this.stop()}
            <StopwatchDisplay
            ref="display"
            {...this.state}
            formatTime={this.formatTime}
            />
        </div>
    </div>
    );
  }
}

export default Stopwatch;
