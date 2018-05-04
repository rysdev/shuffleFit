import React, { Component } from 'react';
import axios from 'axios';

import { loggedIn, getProfile } from '../../utils/AuthService';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadDataFromServer = this.loadDataFromServer.bind(this);
    this.pollInterval = null;
  }
  loadDataFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      })
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
    /*let dataNodes = this.state.data.map(comment => {
      return (
        <div key={ comment._id }>
          { comment.text }
        </div>
      )
    })*/
    return (
      <div>
        <h2>Customize Your Workout</h2>
        {loggedIn() &&
          <div>
            <h3> Login Successful </h3>
            <p> Welcome { getProfile().nickname }</p>
          </div>
        }
        {!loggedIn() &&
          <h3> Not Logged In </h3>
        }
      </div>
    )
  }
}

export default HomePage;
