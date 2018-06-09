import React, { Component } from 'react';
import axios from 'axios';

import style from './style';
import config from '../../utils/config';
import { loggedIn, getProfile } from '../../utils/AuthService';
import ShuffleForm from './ShuffleForm';
import DisplayRoutine from './DisplayRoutine';

class RoutinePage extends Component {
  constructor(props) {
    super(props);
    this.state = { routineData: [], coreData: [] };
    this.handleRoutineSubmit = this.handleRoutineSubmit.bind(this);
    this.pollInterval = null;
  }

  handleRoutineSubmit(apiTail, coreApiTail, user) {
    //populate data for main routines based on form selections
    axios.get(config.API_URL + apiTail)
      .then(res => {
        this.setState({ routineData: res.data });
      });
    //populate data for core routine based on form selections
    axios.get(config.API_URL + coreApiTail)
      .then(res => {
        this.setState({ coreData: res.data });
      });
    //update or create user preference data if user is logged in  
    if (loggedIn()) {
      //attempt to find existing user
      axios.get(config.USER_URL + '/' + getProfile().sub)
        .then(res => {
          if(res.data !== null) {
            //console.log("id found");
            //update preferences for existing user
            axios.post(config.USER_URL + '/' + getProfile().sub + '/' + res.data._id, user)
              .catch(err => {
                console.error(err);
              });
          }
          else {
            //console.log("id not found");
            //create preferences for new user
            axios.post(config.USER_URL, user)
              .catch(err => {
                console.error(err);
              });
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
  
  //this will prevent error messages every 2 seconds
  //after RoutinePage
  componentWillUnmount() {
    //this.pollInterval && clearInterval(this.pollInterval);
    clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  render() {
    let routineNodes = this.state.routineData.map(routine => {
      return (
        <div key={ routine._id }>
          < DisplayRoutine routineName={routine.name} frontUrl={routine.frontImg} backUrl={routine.backImg} sets={routine.sets} reps={routine.reps} seconds=''/>
        </div>
      )
    })
    //create new display component for core to handle seconds
    let coreNodes = this.state.coreData.map(routine => {
      return (
        <div key={ routine._id }>
          < DisplayRoutine routineName={routine.name} frontUrl={routine.frontImg} backUrl={routine.backImg} sets={routine.sets} reps ='' seconds={routine.seconds}/>
        </div>
      )
    })
    return (
      <div>
        < ShuffleForm onRoutineSubmit={ this.handleRoutineSubmit }/>
        {this.state.routineData.length !== 0 &&
        <div>
          <h2> Routine of the Day</h2>
          <h3 style={ style.RoutineDisplay}> Step 1 - Start with 10 minutes of Intense Cardio </h3>
          <div style={ style.RoutineDisplay} >
          <h3> Step 2 - Procede with the following core exercise </h3>
          { coreNodes }
          </div>
          <div style={ style.RoutineDisplay} >
          <h3> Step 3 - Complete the following Weight Training Routines </h3>
          { routineNodes }
          </div>
          <h3 style={ style.RoutineDisplay}> Step 4 - Finish off with 10 more minutes of Intense Cardio </h3>
        </div>
        }
      </div>
    );
  }
}

export default RoutinePage;