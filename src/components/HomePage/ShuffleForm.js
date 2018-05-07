import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import style from './style';

class ShuffleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Link to="/routinel">
          <button style={ style.shuffleButton } type="button">
            Generate Lower Body Routine
          </button>
        </Link>
        <Link to="/routineu">
          <button style={ style.shuffleButton } type="button">
            Generate Upper Body Routine
          </button>
        </Link>
      </div>
    )
  }
}

export default ShuffleForm;