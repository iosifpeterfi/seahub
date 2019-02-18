import React, { Fragment } from 'react';

import { gettext } from '../../utils/constants';
import { seafileAPI } from '../../utils/seafile-api';
import Toast from '../../components/toast';
import UserItem from './org-user-item';

import AddOrgAdminDialog from '../../components/dialog/org-add-admin-dialog';
import ModalPortal from '../../components/modal-portal';

const orgID = window.org.pageOptions.orgID;


class OrgAdminList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      orgAdminUsers: []
    };
  }

  componentDidMount() {
    seafileAPI.listOrgAdminUsers(orgID).then(res => {
      this.setState({
        orgAdminUsers: res.data.org_admins
      });
    });
  }

  toggleDelete = (email) => {
    seafileAPI.deleteOrgUser(orgID, email).then(res => {
      let users = this.state.orgAdminUsers.filter(item => item.email != res.data.email);
      this.setState({
        orgUsers: users
      });
    })
  } 

  toggleResetPW = (email) => {
    seafileAPI.resetOrgUserPassword(orgID, email).then(res => {
      Toast.success(res.data.msg);
    });               
  } 

  toggleRevokeAdmin = (userID) => {
    seafileAPI.removeOrgAdmin(orgID, userID).then(res => {
      this.setState({
        orgAdminUsers: this.state.orgAdminUsers.filter(item => item.id != res.data.user_id)
      });
      Toast.success(res.data.success_msg);
    });
  }

  addOrgAdmin = (users) => {
    seafileAPI.addOrgAdmin(orgID, users).then(res => {
      this.setState({
        orgAdminUsers: this.state.orgAdminUsers.concat(res.data.success)
      });
      this.props.toggleAddOrgAdmin();
    });
  } 


  render() {
    let orgAdminUsers = this.state.orgAdminUsers;

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
            {orgAdminUsers.map(item => {
              return <UserItem key={item.id}
                               user={item}
                               toggleDelete={this.toggleDelete}
                               toggleResetPW={this.toggleResetPW}
                               toggleRevokeAdmin={this.toggleRevokeAdmin}
                               currentTab={this.props.currentTab}
                     />
             })}
           </tbody>
         </table>
         {this.props.isShowAddOrgAdminDialog && (
           <ModalPortal>
             <AddOrgAdminDialog toggle={this.props.toggleAddOrgAdmin}
                                orgID={orgID}
                                addOrgAdmin={this.addOrgAdmin}
             />
           </ModalPortal>
         )}

       </div>
    );
  }
}

export default OrgAdminList;
