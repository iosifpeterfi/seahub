import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import AddOrgUserDialog from '../../components/dialog/org-add-user-dialog'; 
import AddOrgAdminDialog from '../../components/dialog/org-add-admin-dialog';
import ModalPortal from '../../components/modal-portal';

import { siteRoot, gettext } from '../../utils/constants';

class OrgUsers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowAddOrgUserDialog: false,
      isShowAddOrgAdminDialog: false,
    };
  }

  tabItemClick = (param) => {
    this.props.tabItemClick(param);
  }

  toggleAddOrgUser = () => {
    this.setState({
      isShowAddOrgUserDialog: !this.state.isShowAddOrgUserDialog
    });
  }

  toggleAddOrgAdmin = () => {
    this.setState({
      isShowAddOrgAdminDialog: !this.state.isShowAddOrgAdminDialog
    });

  }

  render() {
    return (
      <div className="main-panel-center flex-row">
        <div className="cur-view-container">
          <div className="cur-view-path">
            <ul className="nav">
              <li className="nav-item" onClick={() => this.tabItemClick('users')}>
                <Link className={`nav-link ${this.props.currentTab === 'users' ? 'active': ''}`} to={siteRoot + "org/useradmin/"} title={gettext('All')}>{gettext('All')}</Link>
              </li>
              <li className="nav-item" onClick={() => this.tabItemClick('admins')}>
                <Link className={`nav-link ${this.props.currentTab === 'admins' ? 'active': ''}`} to={siteRoot + "org/useradmin/admins/"} title={gettext('Admin')}>{gettext('Admin')}</Link>
              </li>
            </ul>
            <div className="operation">
              {this.props.currentTab === 'users' &&
              <button className="btn btn-secondary operation-item" title={gettext('Add user')} onClick={this.toggleAddOrgUser}>
                <i className="fas fa-plus-square text-secondary mr-1"></i>{gettext('Add user')}
              </button>
              }
              {this.props.currentTab === 'admins' &&
              <button className="btn btn-secondary operation-item" title={gettext('Add admin')} onClick={this.toggleAddOrgAdmin}>
                <i className="fas fa-plus-square text-secondary mr-1"></i>{gettext('Add admin')}
              </button>
              }
            </div>
          </div>
          {this.props.children}
        </div>
        {this.state.isShowAddOrgUserDialog && (
          <ModalPortal>
            <AddOrgUserDialog toggle={this.toggleAddOrgUser}/>
          </ModalPortal>
        )}
        {this.state.isShowAddOrgAdminDialog && (
          <ModalPortal>
            <AddOrgAdminDialog toggle={this.toggleAddOrgAdmin}/>
          </ModalPortal>
        )}

      </div>
    );
  }
}

export default OrgUsers;
