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
          <div className="cur-view-content">
            <table>
              <thead>
                <tr>
                  <th width="30%">{gettext('Name')}</th>
                  <th width="10%">{gettext('Status')}</th>
                  <th width="20%">{gettext('Space Used')}</th>
                  <th width="20%">{gettext('Create At / Last Login')}</th>
                  <th width="20%">{gettext('Operations')}</th>
                </tr>
              </thead>
              <tbody>
                {this.props.children}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default OrgUsers;
