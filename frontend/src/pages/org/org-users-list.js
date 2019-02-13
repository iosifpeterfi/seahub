import React, { Fragment } from 'react';

import { gettext } from '../../utils/constants';
import { seafileAPI } from '../../utils/seafile-api';
import UserItem from './org-user-item';

const orgID = window.org.pageOptions.orgID;


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
               <th width="20%">{gettext('Operations')}</th>
             </tr>
           </thead>
           <tbody>
            {orgUsers.map(item => {
              return <UserItem key={item.id} user={item} />
             })}
           </tbody>
         </table>
       </div>
    );
  }
}

export default OrgUsersList;
