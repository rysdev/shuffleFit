import React, { Component } from 'react';

//import style or import ui library like material ui

class DisplayRoutine extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <img src={this.props.frontUrl} alt="Routine Image" width="300" height="400"/>
        <p> { this.props.sets } Sets of { this.props.reps } </p>
      </div>
    )
  }
}

export default DisplayRoutine;