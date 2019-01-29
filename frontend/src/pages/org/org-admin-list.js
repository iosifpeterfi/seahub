import React, { Fragment } from 'react';

import { gettext } from '../../utils/constants';


class OrgAdminList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
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
            <tr>
              <td>admin</td>
              <td>admin</td>
              <td>admin</td>
              <td>admin</td>
              <td>admin</td>
            </tr>
           </tbody>
         </table>
       </div>
    );
  }
}

export default OrgAdminList;
