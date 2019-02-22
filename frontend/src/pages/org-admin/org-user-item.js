import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { gettext, siteRoot, orgID, lang } from '../../utils/constants';
import moment from 'moment';
import { seafileAPI } from '../../utils/seafile-api';
import Toast from '../../components/toast';
import { Utils } from '../../utils/utils';
import UserStatusEditor from '../../components/select-editor/user-status-editor';

moment.locale(lang);

const propTypes = {
  currentStatus: PropTypes.bool.isRequired,
  currentTab: PropTypes.string.isRequired,
  toggleRevokeAdmin: PropTypes.func.isRequired,
  toggleDelete: PropTypes.func.isRequired,
};


class UserItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      highlight: '',
      showMenu: false,
      currentStatus: this.props.user.is_active ? 'active' : 'inactive',
      isShowOpMenu: false
    };

    this.statusArray = ['active', 'inactive'];
  }

  onMouseEnter = () => {
    this.setState({
      showMenu: true,
      highlight: 'tr-highlight'
    });
  }

  onMouseLeave = () => {
    this.setState({
      showMenu: false,
      highlight: ''
    });
  } 

  toggleDelete = () => {
    const email = this.props.user.email;
    this.props.toggleDelete(email);
  }        
           
  toggleResetPW = () => {
    const email = this.props.user.email;
    seafileAPI.resetOrgUserPassword(orgID, email).then(res => {
      let msg;
      if (res.data.is_email_configured == false) {
        msg = gettext('Successfully reset password to %(passwd)s for user %(user)s. But email notification can not be sent, because Email service is not properly configured.');
        msg = msg.replace('%(passwd)s', res.data.new_password);
        msg = msg.replace('%(user)s', res.data.user_contact_email);
      }
      else {
        if (res.data.send_email) {
          msg = gettext('Successfully reset password to %(passwd)s, an email has been sent to %(user)s.');
          msg = msg.replace('%(passwd)s', res.data.new_password);
          msg = msg.replace('%(user)s', res.data.user_contact_email);
        }

        if (res.data.send_email == false) {
          msg = gettext('Successfully reset password to %(passwd)s, but failed to send email to %(user)s, please check your email configuration.');
          msg = msg.replace('%(passwd)s', res.data.new_password);
          msg = msg.replace('%(user)s', res.data.user_contact_email);
        }

        if (res.data.send_email == null) {
          msg = gettext('Successfully reset password to %(passwd)s for user %(user)s.');
          msg = msg.replace('%(passwd)s', res.data.new_password);
          msg = msg.replace('%(user)s', res.data.user_contact_email);
        }
      }
      Toast.success(msg);
    });
  }

  toggleRevokeAdmin = () => {
    const userID = this.props.user.id;
    this.props.toggleRevokeAdmin(userID);
  }

  changeStatus = (st) => {
    let statusCode;
    if (st == 'active') {
      statusCode = 1;
    } else {
      statusCode = 0;
    }

    seafileAPI.changeOrgUserStatus(this.props.user.id, statusCode).then(res => {
      this.setState({
        currentStatus: statusCode == 1 ? 'active' : 'inactive' 
      });

      if (res.data.email_sent) {
          Toast.success(gettext('Edit succeeded, an email has been sent.'));
 
      } else if (res.data.email_sent == false) { 
          Toast.success(gettext('Edit succeeded, but failed to send email, please check your email configuration.'));
      } else {                                                                                                          
          Toast.success(gettext('Edit succeeded.'));
      }   
    }).catch(err => {
      Toast.danger(gettext('Edit falied.'));
    });
  }

  clickMenuToggle = (e) => {
    e.preventDefault();
    this.onMenuToggle(e);
  }

  onMenuToggle = (e) => {
    let targetType = e.target.dataset.toggle;
    if (targetType !== 'item') {
      this.setState({
        highlight: '',
        isShowMenu: false,
        isShowOpMenu: !this.state.isShowOpMenu
      });
    }
  } 

  render() {
    let showMenu = !this.props.user.is_self && this.state.showMenu;
    return (
      <tr className={this.state.highlight} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <td>
          <a className="font-weight-normal" href={siteRoot + 'org/useradmin/info/' + encodeURIComponent(this.props.user.email) + '/'}>
            {this.props.user.name}
          </a>
        </td>
        <td>
          <UserStatusEditor 
            isTextMode={true}
            isEditIconShow={showMenu}
            currentStatus={this.state.currentStatus}
            statusArray={this.statusArray}
            onStatusChanged={this.changeStatus}
          />
        </td>
        <td>{this.props.user.quota > 0 ? Utils.bytesToSize(this.props.user.self_usage) + ' / ' + Utils.bytesToSize(this.props.user.quota) : Utils.      bytesToSize(this.props.user.self_usage)}</td>
        <td style={{ 'fontSize': '11px'}}>{this.props.user.ctime} / {this.props.user.last_login ? moment(this.props.user.last_login).fromNow() : '--'}</td>
        {(!this.props.user.is_self && this.state.showMenu) ?
          <td className="text-center cursor-pointer">
            {!this.props.user.is_self && this.state.showMenu && (
              <Dropdown isOpen={this.state.isShowOpMenu} toggle={this.onMenuToggle}>
                <DropdownToggle
                  tag="a"
                  className="fas fa-ellipsis-v"
                  title={gettext('More Operations')}
                  data-toggle="dropdown"
                  aria-expanded={this.state.isShowOpMenu}
                  onClick={this.clickMenuToggle}
                />
                <DropdownMenu>
                   <DropdownItem onClick={this.toggleDelete}>{gettext('Delete')}</DropdownItem>
                   <DropdownItem onClick={this.toggleResetPW}>{gettext('ResetPwd')}</DropdownItem>
                   {this.props.currentTab == 'admins' &&
                     <DropdownItem onClick={this.toggleRevokeAdmin}>{gettext('Revoke Admin')}</DropdownItem>
                   }
                 </DropdownMenu>
               </Dropdown>
            )}
          </td> : <td></td>
        }
      </tr>
    );
  }
}

UserItem.propTypes = propTypes;

export default UserItem;
