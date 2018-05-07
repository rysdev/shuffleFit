import React, { Component } from 'react';
import axios from 'axios';

import config from '../../utils/config';

class RoutinePage extends Component {
  constructor(props) {
    super(props);
    this.state = { routineData: [] };
    this.loadDataFromServer = this.loadDataFromServer.bind(this);
    this.pollInterval = null;
  }

  loadDataFromServer() {
    axios.get(config.API_URL + this.props.routineType)
      .then(res => {
        this.setState({ routineData: res.data });
      })
  }

  componentDidMount() {
    this.loadDataFromServer();
  }
  
  //this will prevent error messages every 2 seconds
  //after RoutinePage
  componentWillUnmount() {
    //this.pollInterval && clearInterval(this.pollInterval);
    clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  render() {
    return (
      <div>
        <h2>Routine here</h2>
        <div><pre>{JSON.stringify(this.state.routineData, null, 2) }</pre></div>
      </div>
    );
  }
}

export default RoutinePage;