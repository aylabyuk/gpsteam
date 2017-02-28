import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

//ui
import DataTables from 'material-ui-datatables';


const TABLE_COLUMNS = [
  {
    key: 'first_name',
    label: 'firstname'
  }, {
    key: 'last_name',
    label: 'lastname'
  }, {
    key: 'contact_number',
    label: 'contact number',
  }
];

class SiteContacts extends Component {

    constructor(props, context) {
        super(props, context);
            this.state = {
                page: 1
            }
    }

    handleSelection = (key) => {
        // this.props.setSelectedTableKey(key)
    };

    handleFilterValueChange(value) {

    }
      
    render() {
        return(
             <DataTables
                height={'auto'}
                selectable={true}
                showRowHover={true}
                columns={TABLE_COLUMNS}
                data={ [{ first_name: 'fname', last_name: 'lname', contact_number: 'contact' }] }
                showCheckboxes={true}
                showHeaderToolbar={true}
                filterHintText='Search'
                onFilterValueChange={this.handleFilterValueChange}
                onRowSelection={this.handleSelection}
                page={this.state.page}
                count={10}
            />
        );
    }
}   


export default SiteContacts  
