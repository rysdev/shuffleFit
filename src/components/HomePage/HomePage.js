import React, { Component } from 'react';
//import axios from 'axios';

import RoutinePage from './RoutinePage';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadDataFromServer = this.loadDataFromServer.bind(this);
    this.pollInterval = null;
  }
  loadDataFromServer() {
    //this will use api address from config to load user preference data
    /*axios.get()
      .then(res => {
        this.setState({ data: res.data });
      }) */
  }

  componentDidMount() {
    this.loadDataFromServer();
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadDataFromServer, this.props.pollInterval)
    } 
  }
  
  //this will prevent error messages every 2 seconds
  //after HomePage is unmounted
  componentWillUnmount() {
    //this.pollInterval && clearInterval(this.pollInterval);
    clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  render() {
    return (
      <div>
        <h2>Randomize Your Workout</h2>
        < RoutinePage />
      </div>
    )
  }
}

export default HomePage;
