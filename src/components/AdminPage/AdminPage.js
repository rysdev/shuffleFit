import React, { Component } from 'react';
import axios from 'axios';

import AdminForm from './AdminForm';
import { getProfile } from '../../utils/AuthService';
import config from '../../utils/config';
import { SSL_OP_PKCS1_CHECK_2 } from 'constants';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.handleLowerbSubmit = this.handleLowerbSubmit.bind(this);
    this.handleUpperbSubmit = this.handleUpperbSubmit.bind(this);
  }
  handleLowerbSubmit(routine) {
    axios.post(config.LOWERB_URL, routine)
      .catch(err => {
        console.error(err);
      });
  }

  handleUpperbSubmit(routine) {
    axios.post(config.UPPERB_URL, routine)
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <h2>Admin Page</h2>
        {getProfile().sub === config.ADMIN_SUB &&
          <div>
            <h3> Admin Access Granted </h3>
            <p> Welcome { getProfile().nickname }</p>
            <h2> Enter Lower Body Routine </h2>
            <AdminForm onRoutineSubmit={ this.handleLowerbSubmit }/>
            <h2> Enter Upper Body Routine </h2>
            <AdminForm onRoutineSubmit={ this.handleUpperbSubmit }/>
          </div>
        }
        {getProfile().sub !== config.ADMIN_SUB &&
          <h3> Admin Access Denied </h3>
        }
      </div>
    );
  }
}

export default AdminPage;
