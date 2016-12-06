import React, { Component } from 'react';
import './App.css';

class Time extends Component {
  render() {
    return (
      <div className="row" id="time">
        <h1 className="text-center">
          {Math.floor( this.props.diff/(60*60*24))}:{Math.floor((this.props.diff/(60*60)) % 24)}:{Math.floor((this.props.diff/60) % 60)}:{Math.floor( this.props.diff % 60) > 9 ? Math.floor( this.props.diff % 60) : "0" + Math.floor( this.props.diff % 60)}
        </h1>
      </div>
    )
  }
}

class Clock extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {now: new Date(), end: new Date(), diff: 0};
  }

  componentDidMount() {
    this.timer = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({now: new Date})
    if (this.state.end - this.state.now >= 0) {
      this.setState((prevState, props) => {
        return {
          diff: Math.floor((prevState.end - prevState.now) / 1000)
        }
      });
    }
    else {
      this.setState({diff: 0})
    }
  }

  handleChange() {
    this.setState({end: Date.parse(this.refs.time.value)});
  }

  render() {
    return (
      <div>
        <Time diff={this.state.diff} />
        <div className="form-group">
          <label htmlFor="timeInput">Count down until:</label>
          <input
            className="form-control"
            type="text"
            ref="time"
            id="timeInput"
            defaultValue={this.state.end}
            onChange={this.handleChange} />
        </div>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return <Clock />;
  }
}

export default App;