import React, { Component } from 'react';

import style from './style';

class AdminForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', reps: '10', sets: '3', equipment: 'Kettlebell', frontImg: '', backImg: '' };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRepsChange = this.handleRepsChange.bind(this);
    this.handleSetsChange = this.handleSetsChange.bind(this);
    this.handleEquipmentChange = this.handleEquipmentChange.bind(this);
    this.handleFrontImgChange = this.handleFrontImgChange.bind(this);
    this.handleBackImgChange = this.handleBackImgChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  handleRepsChange(e) {
    this.setState({ reps: e.target.value });
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
    let reps = this.state.reps;
    let sets = this.state.sets;
    let equipment = this.state.equipment;
    let frontImg = this.state.frontImg.trim();
    let backImg = this.state.backImg.trim();
    if (!backImg || !frontImg || !equipment || !sets || !reps || !name) {
      return;
    }
    this.props.onRoutineSubmit({ name: name, reps: reps, sets: sets, equipment: equipment, frontImg: frontImg, backImg: backImg });
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
        <select value={this.state.reps} onChange={this.handleRepsChange}>
          <option default value="10">10</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="7">7</option>
          <option value="12">12</option>
          <option value="15">15</option>
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
          <option default value="Kettlebell">KettleBell</option>
          <option value="Dumbbell">Dumbbell</option>
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

export default AdminForm;