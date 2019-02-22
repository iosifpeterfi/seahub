import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { gettext, orgID } from '../../utils/constants';
import { seafileAPI } from '../../utils/seafile-api';
import Toast from '../../components/toast';
import UserItem from './org-user-item';

import AddOrgAdminDialog from '../../components/dialog/org-add-admin-dialog';
import ModalPortal from '../../components/modal-portal';

const propTypes = {
  toggleAddOrgAdmin: PropTypes.func.isRequired,
  currentTab: PropTypes.string.isRequired,
  isShowAddOrgAdminDialog: PropTypes.bool.isRequired,
};


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
      this.setState({
        orgAdminUsers: this.state.orgAdminUsers.filter(item => item.email != res.data.user.email)
      });
      let msg = gettext('Successfully deleted %s');
      msg = msg.replace('%s', res.data.user.name);
      Toast.success(msg);
    })
  } 

  toggleRevokeAdmin = (userID) => {
    seafileAPI.removeOrgAdmin(orgID, userID).then(res => {
      this.setState({
        orgAdminUsers: this.state.orgAdminUsers.filter(item => item.id != res.data.id)
      });
      let msg = gettext('Successfully revoke the admin permission of %s');
      msg = msg.replace('%s', res.data.name);
      Toast.success(msg);
    });
  }

  addOrgAdmin = (users) => {
    seafileAPI.addOrgAdmin(orgID, users).then(res => {
      this.setState({
        orgAdminUsers: this.state.orgAdminUsers.concat(res.data.result.success)
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
                               toggleRevokeAdmin={this.toggleRevokeAdmin}
                               currentTab={this.props.currentTab}
                     />
             })}
           </tbody>
         </table>
         {this.props.isShowAddOrgAdminDialog && (
           <ModalPortal>
             <AddOrgAdminDialog toggle={this.props.toggleAddOrgAdmin}
                                addOrgAdmin={this.addOrgAdmin}
             />
           </ModalPortal>
         )}

       </div>
    );
  }
}

OrgAdminList.propTypes = propTypes;

export default OrgAdminList;
