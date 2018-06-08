import React, { Component } from 'react';

//import style or import ui library like material ui
//maybe add lightbox library for zooming in on images
import style from './style';

class DisplayRoutine extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={ style.RoutineDisplay} >
        <span> 
          <img src={this.props.frontUrl} alt="Routine Demonstration" width="300" height="400"/>
          <img src={this.props.backUrl} alt="Routine Details" width="300" height="400"/>
        </span>
        <h2> Complete { this.props.sets } Sets of { this.props.reps } </h2>
      </div>
    )
  }
}

export default DisplayRoutine;