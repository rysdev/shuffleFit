import React, { Component } from 'react';
import axios from 'axios';

import AdminForm from './AdminForm';
import { getProfile } from '../../utils/AuthService';
import config from '../../utils/config';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.handleRoutineSubmit = this.handleRoutineSubmit.bind(this);
  }
  handleRoutineSubmit(routine) {
    axios.post(config.LOWERB_URL, routine)
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
            <AdminForm onRoutineSubmit={ this.handleRoutineSubmit }/>
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
