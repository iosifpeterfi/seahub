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
            <div className="operation">
              <button className="btn btn-secondary operation-item" title={gettext('Add user')} onClick={() => {console.log('Add user')}}>
                <i className="fas fa-plus-square text-secondary mr-1"></i>{gettext('Add user')}
              </button>
              <button className="btn btn-secondary operation-item" title={gettext('Add admin')} onClick={() => {console.log('Add admin')}}>
                <i className="fas fa-plus-square text-secondary mr-1"></i>{gettext('Add admin')}
              </button>
            </div>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default OrgUsers;
