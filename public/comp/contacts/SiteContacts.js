import React, { Component } from 'react';
import { setSelectedTableKey } from '../../actions/index'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

//ui
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class SiteContacts extends Component {


    handleSelection = (key) => {
        this.props.setSelectedTableKey(key)
    };
      
    render() {

        let contacts = this.props.contacts.map((d) =>
            <TableRow key={d.contact_id}>
                <TableRowColumn>{d.contact_id}</TableRowColumn>
                <TableRowColumn>{d.first_name + ' ' + d.last_name}</TableRowColumn>
                <TableRowColumn>{d.contact_number}</TableRowColumn>
            </TableRow>
        );

        return (
              <Table onRowSelection={this.handleSelection}>
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

const form =  reduxForm({  
	form: 'logsheet'
})

function mapStateToProps(state) {  
	return {
		
	}
}

export default connect(mapStateToProps, { setSelectedTableKey })(form(SiteContacts))  