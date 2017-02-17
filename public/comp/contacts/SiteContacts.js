import React, { Component } from 'react';

//ui
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class SiteContacts extends Component {
      
    render() {

        let contacts = this.props.contacts.map((d) =>
            <TableRow key={d.contact_id}>
                <TableRowColumn>{d.contact_id}</TableRowColumn>
                <TableRowColumn>{d.first_name + ' ' + d.last_name}</TableRowColumn>
                <TableRowColumn>{d.contact_number}</TableRowColumn>
            </TableRow>
        );

        return (
              <Table>
                <TableHeader>
                <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Contact Number</TableHeaderColumn>
                </TableRow>
                </TableHeader>
                <TableBody>

                {contacts}
                
                </TableBody>
            </Table>
        );
    }
}

export default SiteContacts;