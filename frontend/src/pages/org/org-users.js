import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import { siteRoot, gettext } from '../../utils/constants';

class OrgUsers extends Component {

  render() {
    return (
      <div className="main-panel-center flex-row">
        <div className="cur-view-container">
          <div className="cur-view-path">
            <ul className="nav">
              <li className="nav-item">
                <Link className="nav-link active" to={siteRoot + "org/useradmin/"} title={gettext('All')}>{gettext('All')}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={siteRoot + "org/useradmin/admins/"} title={gettext('Admin')}>{gettext('Admin')}</Link>
              </li>
            </ul>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default OrgUsers;
