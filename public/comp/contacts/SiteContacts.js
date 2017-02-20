import React, { Component } from 'react';
import { setSelectedTableKey } from '../../actions/index'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

//ui
import DataTables from 'material-ui-datatables';


const TABLE_COLUMNS = [
  {
    key: 'first_name',
    label: 'firstname',
  }, {
    key: 'last_name',
    label: 'lastname',
  }, {
    key: 'contact_number',
    label: 'contact number',
  }
];

class SiteContacts extends Component {

    constructor(props, context) {
        super(props, context);
            this.handleFilterValueChange = this.handleFilterValueChange.bind(this);

            this.state = {
                tableData: this.props.contacts,
                page: 1
            }

    }

    handleSelection = (key) => {
        this.props.setSelectedTableKey(key)
    };

    handleFilterValueChange(value) {


    //    let newArray = this.props.contacts.filter(function(row) {
    //         return row.first_name.match('/' + value + '/')
    //    })

    //    console.log(newArray)
    //    this.setState({tableData: newArray})

    let arr = this.props.contacts

    var filtered = (function(pattern){
        var filtered = [], i = arr.length, re = new RegExp('' + pattern);
        while (i--) {
            if (re.test(arr[i].first_name) || re.test(arr[i].last_name)) {
                filtered.push(arr[i]);
            }
        }
        return filtered;
    })(value); 

     this.setState({tableData: filtered})

     console.log(this.props.contacts)

    }
      
    render() {
        return(
             <DataTables
                height={'auto'}
                selectable={true}
                showRowHover={true}
                columns={TABLE_COLUMNS}
                data={this.state.tableData}
                showCheckboxes={true}
                showHeaderToolbar={true}
                filterHintText='Search'
                onFilterValueChange={this.handleFilterValueChange}
                onRowSelection={this.handleSelection}
                page={this.state.page}
                count={this.state.tableData.length}
            />
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
