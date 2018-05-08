import React, { Component } from 'react';

//import style or import ui library like material ui
//maybe add lightbox library for zooming in on images

class DisplayRoutine extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <span> 
          <img src={this.props.frontUrl} alt="Routine Image" width="300" height="400"/>
          <img src={this.props.backUrl} alt="Routine Details" width="300" height="400"/>
        </span>
        <p> { this.props.sets } Sets of { this.props.reps } </p>
      </div>
    )
  }
}

export default DisplayRoutine;