import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { gettext, orgID } from '../../utils/constants';
import { seafileAPI } from '../../utils/seafile-api';
import Toast from '../../components/toast';
import UserItem from './org-user-item';

import AddOrgUserDialog from '../../components/dialog/org-add-user-dialog'; 
import ModalPortal from '../../components/modal-portal';


const propTypes = {
  toggleAddOrgUser: PropTypes.func.isRequired,
  currentTab: PropTypes.string.isRequired,
  isShowAddOrgUserDialog: PropTypes.bool.isRequired,
};

class OrgUsersList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      orgUsers: []
    };
  }

  componentDidMount() {
    seafileAPI.listOrgUsers(orgID).then(res => {
      this.setState({
        orgUsers: res.data.org_users
      });
    });
  }

  toggleDelete = (email) => {
    seafileAPI.deleteOrgUser(orgID, email).then(res => {
      let users = this.state.orgUsers.filter(item => item.email != res.data.user.email);
      this.setState({
        orgUsers: users
      });
      let msg = gettext('Successfully deleted %s');
      msg = msg.replace('%s', res.data.user.name);
      Toast.success(msg);
    }).catch(err => {
      Toast.danger(err.response.data.error_msg);
    })
  } 

  handleSubmit = (email, name, password1, password2) => {
    seafileAPI.addOrgUser(orgID, email, name, password1, password2).then(res => {
      this.setState({
        orgUsers: this.state.orgUsers.concat(res.data.user)
      }); 
      this.props.toggleAddOrgUser();
      let msg;
      if(res.data.is_email_configured == false) {
        msg = gettext('Successfully added user %s. But email notification can not be sent, because Email service is not properly configured.');
        msg = msg.replace('%s', email);
      }
      else {
        if (res.data.send_email == false) {
          msg = gettext('Successfully added user %s. An error accurs when sending email notification, please check your email configuration.');
          msg = msg.replace('%s', email);
        }

        if (res.data.send_email == null) {
          msg = gettext('Successfully added user %s.');
          msg = msg.replace('%s', email);
        } 

        if (res.data.send_email) { 
          msg = gettext('Successfully added user %s. An email notification has been sent.')
          msg = msg.replace('%s', email);
        }
      }
      Toast.success(msg);
    });
  } 

  render() {
    let orgUsers = this.state.orgUsers;

    return (
       <div className="cur-view-content">
         <table>
           <thead>
             <tr>
               <th width="30%">{gettext('Name')}</th>
               <th width="10%">{gettext('Status')}</th>
               <th width="20%">{gettext('Space Used')}</th>
               <th width="20%">{gettext('Create At / Last Login')}</th>
               <th width="20%" className="text-center">{gettext('Operations')}</th>
             </tr>
           </thead>
           <tbody>
            {orgUsers.map(item => {
              return <UserItem key={item.id}
                               user={item}
                               toggleDelete={this.toggleDelete}
                               currentTab={this.props.currentTab}
                     />
             })}
           </tbody>
         </table>
          {this.props.isShowAddOrgUserDialog && (
            <ModalPortal>
              <AddOrgUserDialog toggle={this.props.toggleAddOrgUser}
                                handleSubmit={this.handleSubmit}
              />
            </ModalPortal>
          )}
       </div>
    );
  }
}

OrgUsersList.propTypes = propTypes;

export default OrgUsersList;
