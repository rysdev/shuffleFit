import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import style from './style';

class ShuffleForm extends Component {
  constructor(props) {
    super(props);
    this.state = { type: '/routinel'};
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  handleTypeChange(e) {
    this.setState({ type: e.target.value });
  }  

  render() {
    return (
      <div>
        <label>
          Select Your Routine
          <select value={this.state.type} onChange={this.handleTypeChange}>
            <option selected value="/routinel">Lower Body</option>
            <option value="/routineu">Upper Body</option>
          </select>
        </label>
        <Link to={this.state.type}>
          <button style={ style.shuffleButton } type="button">
            Generate Routine
          </button>
        </Link>
      </div>
    )
  }
}

export default ShuffleForm;