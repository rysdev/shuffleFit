import React, { Component } from 'react';

import style from './style';

class AdminForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', reps: 0, sets: 0, frontImg: '', backImg: '' };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleFrontImgChange = this.handleFrontImgChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  handleFrontImgChange(e) {
    this.setState({ frontImg: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let name = this.state.name.trim();
    let frontImg = this.state.frontImg.trim();
    if (!frontImg || !name) {
      return;
    }
    this.props.onRoutineSubmit({ name: name, reps: '10', sets: '3', frontImg: frontImg, backImg: 'not set' });
    this.setState({ name: '', frontImg: '' });
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
        <input
          type='text'
          placeholder='Front picture link...'
          style={ style.routineFormFrontImg}
          value={ this.state.frontImg }
          onChange={ this.handleFrontImgChange } />
        <input
          type='submit'
          style={ style.routineFormPost }
          value='Post'/>
      </form>
    )
  }
}

export default AdminForm;