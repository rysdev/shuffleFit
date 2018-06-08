import React, { Component } from 'react';
import axios from 'axios';

import style from './style';
import config from '../../utils/config';
import ShuffleForm from './ShuffleForm';
import DisplayRoutine from './DisplayRoutine';

class RoutinePage extends Component {
  constructor(props) {
    super(props);
    this.state = { routineData: [], coreData: [] };
    //this.loadDataFromServer = this.loadDataFromServer.bind(this);
    this.handleRoutineSubmit = this.handleRoutineSubmit.bind(this);
    this.pollInterval = null;
  }

  /*loadDataFromServer() {
    This will load user presets
  }*/

  handleRoutineSubmit(apiTail, coreApiTail) {
    axios.get(config.API_URL + apiTail)
      .then(res => {
        this.setState({ routineData: res.data });
      })
      axios.get(config.API_URL + coreApiTail)
      .then(res => {
        this.setState({ coreData: res.data });
      })
  }

  /*componentDidMount() {
    this.loadDataFromServer();
  } */
  
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
          <h3 style={ style.RoutineDisplay}> Step 2 - Follow up with core exercises (like 3 sets of planks) </h3>
          { coreNodes }
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