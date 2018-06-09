import React, { Component } from 'react';
import axios from 'axios';
import { loggedIn, getProfile } from '../../utils/AuthService';

import style from './style';
import config from '../../utils/config';

class ShuffleForm extends Component {
  constructor(props) {
    super(props);
    this.state = { type: 'lowerb/', equip: 'Dumbbell/', coreEquip: 'Weights/', amt: '3'};
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleEquipChange = this.handleEquipChange.bind(this);
    this.handleCoreEquipChange = this.handleCoreEquipChange.bind(this);
    this.handleAmtChange = this.handleAmtChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadDataFromServer = this.loadDataFromServer.bind(this);
  }

  handleTypeChange(e) {
    this.setState({ type: e.target.value });
  }

  handleEquipChange(e) {
    this.setState({ equip: e.target.value });
  }

  handleCoreEquipChange(e) {
    this.setState({ coreEquip: e.target.value });
  }

  handleAmtChange(e) {
    this.setState({ amt: e.target.value });
  }

  loadDataFromServer() {
    if (loggedIn()) {
      axios.get(config.USER_URL + '/' + getProfile().sub)
        .then(res => {
          if(res.data !== null) {
            //console.log("id found");
            //update preferences for existing user, auto-alternates body group for each login
            let userPref = res.data.pref;
            if(userPref.bodyGroup === 'lowerb/')
              this.setState({ type: 'upperb/', equip: userPref.equipment, coreEquip: userPref.coreOptions, amt: userPref.numRoutines });
            else
              this.setState({ type: 'lowerb/', equip: userPref.equipment, coreEquip: userPref.coreOptions, amt: userPref.numRoutines });
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let apitail = this.state.type + this.state.equip + this.state.amt;
    let coreapitail = 'core/' + this.state.coreEquip + '1';
    let user = {};
    if (loggedIn()) {
      let pref = { bodyGroup: this.state.type, equipment: this.state.equip, numRoutines: this.state.amt, coreOptions: this.state.coreEquip };
      user = { userID: getProfile().sub, name: getProfile().name, pref}
    }
    this.props.onRoutineSubmit(apitail, coreapitail, user);
  }

  componentDidMount() {
    this.loadDataFromServer();
  } 

  render() {
    return (
      <div>
        <label>
          Select Your Routine
          <form style={ style.shuffleForm } onSubmit={ this.handleSubmit }>
          <label>
            Body Group
          <select value={this.state.type} style={ style.shuffleField} onChange={this.handleTypeChange}>
            <option default value="lowerb/">Lower Body</option>
            <option value="upperb/">Upper Body</option>
          </select>
          </label>
          <label>
            Equipment
          <select value={this.state.equip} style={ style.shuffleField} onChange={this.handleEquipChange}>
            <option default value="Dumbbell/">Dumbbell</option>
            <option value="Kettlebell/">Kettlebell</option>
            <option value="">All</option>
          </select>
          </label>
          <label>
            # of Routines
          <select value={this.state.amt} style={ style.shuffleField} onChange={this.handleAmtChange}>
            <option default value="3">3</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          </label>
          <label>
            Core Options
          <select value={this.state.coreEquip} style={ style.shuffleField} onChange={this.handleCoreEquipChange}>
            <option default value="Weights/">Weights</option>
            <option value="Bodyweight/">Bodyweight</option>
            <option value="">All</option>
          </select>
          </label>
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