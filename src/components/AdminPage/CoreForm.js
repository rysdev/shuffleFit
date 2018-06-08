import React, { Component } from 'react';

import style from './style';

class CoreForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', seconds: '30', sets: '3', equipment: 'Weights', frontImg: '', backImg: '' };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSecondsChange = this.handleSecondsChange.bind(this);
    this.handleSetsChange = this.handleSetsChange.bind(this);
    this.handleEquipmentChange = this.handleEquipmentChange.bind(this);
    this.handleFrontImgChange = this.handleFrontImgChange.bind(this);
    this.handleBackImgChange = this.handleBackImgChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  handleSecondsChange(e) {
    this.setState({ seconds: e.target.value });
  }
  handleSetsChange(e) {
    this.setState({ sets: e.target.value });
  }
  handleEquipmentChange(e) {
    this.setState({ equipment: e.target.value });
  }
  handleFrontImgChange(e) {
    this.setState({ frontImg: e.target.value });
  }
  handleBackImgChange(e) {
    this.setState({ backImg: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let name = this.state.name.trim();
    let seconds = this.state.seconds;
    let sets = this.state.sets;
    let equipment = this.state.equipment;
    let frontImg = this.state.frontImg.trim();
    let backImg = this.state.backImg.trim();
    if (!backImg || !frontImg || !equipment || !sets || !seconds || !name) {
      return;
    }
    //this.props.onRoutineSubmit({ name: name, seconds: seconds, sets: sets, equipment: equipment, frontImg: frontImg, backImg: backImg });
    this.props.onRoutineSubmit({ name: "test", seconds: "30", sets: "3", equipment: "test", frontImg: "test", backImg: "test" });
    this.setState({ name: '', frontImg: '', backImg: '' });
  }
  render() {
    return (
      <form style={ style.routineForm } onSubmit={ this.handleSubmit }>
        <input
          type='text'
          placeholder='Routine name...'
          style={ style.routineFormName}
          value={ this.state.name }
          onChange={ this.handleNameChange } />
        <select value={this.state.seconds} onChange={this.handleSecondsChange}>
          <option default value="30">30</option>
          <option value="15">15</option>
          <option value="45">45</option>
          <option value="60">60</option>
          <option value="120">120</option>
          <option value="180">180</option>
        </select>
        <select value={this.state.sets} onChange={this.handleSetsChange}>
          <option default value="3">3</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <select value={this.state.equipment} onChange={this.handleEquipmentChange}>
          <option default value="Weights">Weights</option>
          <option value="Bodyweight">Bodyweight</option>
        </select>
        <input
          type='text'
          placeholder='Front picture link...'
          style={ style.routineFormImg}
          value={ this.state.frontImg }
          onChange={ this.handleFrontImgChange } />
        <input
          type='text'
          placeholder='Back picture link...'
          style={ style.routineFormImg}
          value={ this.state.backImg }
          onChange={ this.handleBackImgChange } />
        <input
          type='submit'
          style={ style.routineFormPost }
          value='Post'/>
      </form>
    )
  }
}

export default CoreForm;