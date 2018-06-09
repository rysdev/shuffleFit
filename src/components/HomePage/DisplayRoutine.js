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
        {typeof this.props.backUrl !== 'undefined' &&
          <div>
            <span>
              <img src={this.props.frontUrl} alt="Routine Demonstration" width="300" height="400"/>
              <img src={this.props.backUrl} alt="Routine Details" width="300" height="400"/>
            </span>
          </div>
        }
        {typeof this.props.backUrl === 'undefined' &&
          <div>
            <span> 
              <img src={this.props.frontUrl} alt="Routine Demonstration" width="600" height="400"/>
            </span>
          </div>
        }
        {this.props.reps !== '' &&
          <div>
            <h2> Complete { this.props.sets } Sets of { this.props.reps } Reps </h2>
          </div>
        }
        {this.props.seconds !== '' &&
          <div>
            <h2> {this.props.routineName}: Continuously for { this.props.seconds } seconds for { this.props.sets } Sets </h2>
          </div>
        }
      </div>
    )
  }
}

export default DisplayRoutine;