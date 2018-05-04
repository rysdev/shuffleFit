import React from 'react';

import { getProfile } from '../../utils/AuthService';
import config from '../../utils/config';

const AdminPage = () => (
  <div>
    <h2>Admin Page</h2>
    {getProfile().sub === config.ADMIN_SUB &&
      <div>
        <h3> Admin Access Granted </h3>
        <p> Welcome { getProfile().nickname }</p>
      </div>
    }
    {getProfile().sub !== config.ADMIN_SUB &&
      <h3> Admin Access Denied </h3>
    }
  </div>
);

export default AdminPage;
