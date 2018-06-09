import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//import AdminForm from './AdminForm';
//import CoreForm from './CoreForm';
import { loggedIn, getProfile } from '../../utils/AuthService';
import config from '../../utils/config';
import style from './style';

class UserOptions extends Component {
  constructor(props) {
    super(props);
    this.state = { userData: [], message: '' };
    this.loadDataFromServer = this.loadDataFromServer.bind(this);
    this.handleUserDeleteSubmit = this.handleUserDeleteSubmit.bind(this);
    //this.handleDeleteMessage = this.handleDeleteMessage.bind(this);
  }
  loadDataFromServer() {
    if (loggedIn()) {
      axios.get(config.USER_URL + '/' + getProfile().sub)
        .then(res => {
          if(res.data !== null) {
            //console.log("id found");
            //update preferences for existing user, auto-alternates body group for each login
            this.setState({ userData : res.data });
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  handleUserDeleteSubmit(e) {
    axios.delete(config.USER_URL + '/' + this.state.userData.userID + '/' + this.state.userData._id)
      .catch(err => {
        console.error(err);
      });

    e.preventDefault();
    this.setState( { userData: [], message : 'User Data Successfully Removed' });
  }

  componentDidMount() {
    this.loadDataFromServer();
  } 

  render() {
    return (
      <div>
        <h2>User Options</h2>
        <h3> {this.state.message} </h3>
        {typeof this.state.userData.name !== 'undefined' &&
          <div>
            <p> Welcome { this.state.userData.name }</p>
            {this.state.userData.isAdmin &&
              <div>
                <p> Admin Access </p>
                <Link to="/admin">Add Exercise Routines</Link>
              </div>
            }
            {!this.state.userData.isAdmin &&
            <p> Regular User Access</p>
            }
          </div>
        }
        {typeof this.state.userData.name === 'undefined' &&
          <h3> Options for Registered Users Only </h3>
        }
      <form style={ style.optionForm } onSubmit={ this.handleUserDeleteSubmit }>
        <input
          style={ style.optionPost }
          type='submit'
          value='Delete My User Data'/>
      </form>
      </div>
    );
  }
}

export default UserOptions;