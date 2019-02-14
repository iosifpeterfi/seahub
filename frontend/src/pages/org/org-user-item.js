import React, { Fragment } from 'react';

import { gettext, siteRoot } from '../../utils/constants';
import moment from 'moment';
import { Utils } from '../../utils/utils';
import UserStatusEditor from '../../components/select-editor/user-status-editor';

moment.locale(window.app.config.lang);

class UserItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      highlight: '',
      showMenu: false,
      currentStatus: this.props.user.is_active ? 'active' : 'inactive',
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
    this.props.toggleResetPW(email);
  } 

  changeStatus = (st) => {
    console.log(st)
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
          <td>
            <a className="font-weight-normal pr-2" href="#" onClick={this.toggleDelete}>{gettext('Delete')}</a>
            <a className="font-weight-normal pr-2" href="#" onClick={this.toggleResetPW}>{gettext('ResetPwd')}</a>
          </td> : <td></td>
        }
      </tr>
    );
  }
}

export default UserItem;
