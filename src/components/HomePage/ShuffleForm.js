import React, { Component } from 'react';

import style from './style';

class ShuffleForm extends Component {
  constructor(props) {
    super(props);
    this.state = { type: 'lowerb/', amt: '3'};
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleAmtChange = this.handleAmtChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTypeChange(e) {
    this.setState({ type: e.target.value });
  }

  handleAmtChange(e) {
    this.setState({ amt: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let apitail = this.state.type + this.state.amt;
    this.props.onRoutineSubmit(apitail);
  }

  render() {
    return (
      <div>
        <label>
          Select Your Routine
          <form style={ style.shuffleForm } onSubmit={ this.handleSubmit }>
          <select value={this.state.type} onChange={this.handleTypeChange}>
            <option default value="lowerb/">Lower Body</option>
            <option value="upperb/">Upper Body</option>
          </select>
          <select value={this.state.amt} onChange={this.handleAmtChange}>
            <option default value="3">3</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input
            type='submit'
            style={ style.shuffleButton }
            value='Generate Routine'/>
          </form>
        </label>
      </div>
    )
  }
}

export default ShuffleForm;