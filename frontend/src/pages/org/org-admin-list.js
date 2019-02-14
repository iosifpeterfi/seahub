import React, { Fragment } from 'react';

import { gettext } from '../../utils/constants';
import { seafileAPI } from '../../utils/seafile-api';
import Toast from '../../components/toast';
import UserItem from './org-user-item';

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
      let users = this.state.orgUsers.filter(item => item.email != res.data.email);
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
               <th width="20%">{gettext('Operations')}</th>
             </tr>
           </thead>
           <tbody>
            {orgAdminUsers.map(item => {
              return <UserItem key={item.id}
                               user={item}
                               toggleDelete={this.toggleDelete}
                               toggleResetPW={this.toggleResetPW}

                     />
             })}
           </tbody>
         </table>
       </div>
    );
  }
}

export default OrgAdminList;
