import React, { Component } from 'react';

import { reduxForm, Field } from 'redux-form'
import { TextField, AutoComplete, FlatButton, Dialog } from 'material-ui'
import moment from 'moment'
import { connect } from 'react-redux'
import { removeSelectedStaff } from '../../actions/index'

import _Staff from '../staff/_Staff'
import SelectedStaffs from '../staff/SelectedStaffs'


const renderTextField = ({ input, label, fullWidth, meta: { touched, error }, ...custom }) => (
  <TextField 
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    fullWidth={fullWidth}
  />
)

const renderAutoCompleteField = ({ input, label, dataSource, meta: { touched, error } }) => (
  <AutoComplete
      floatingLabelText={label}
      filter={AutoComplete.caseInsensitiveFilter}
      openOnFocus={true}
      dataSource={dataSource}
      listStyle={{ maxHeight: 200, overflow: 'auto' }}
      onUpdateInput={input.onChange}
      searchText={input.value}
      errorText={touched && error}
      textFieldStyle={{width: '100%'}}
    />
)

const years = () => {
    let arr = Array();
    let now = new Date().getFullYear();

    for(let i = 2000; i <= now; i++) arr.push(i.toString());

    return arr.reverse()
}

const months = () => {
    return moment.months()
}

class FieldWorkForm extends Component {
    constructor(props) {
        super(props);
        this.state = { openDialog: false };
    }

    handleOpen = () => {
        this.setState({openDialog: true});
    };

    handleClose = () => {
        this.setState({openDialog: false});
    };

    render() {
        return (
            <div style={{textAlign: "center"}}>
                <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between'}} >
                    <Field style={{flexGrow: 1, marginLeft: 2, marginRight: 2 }} name='year' label="year" dataSource={years()} component={renderAutoCompleteField}  />
                    <Field style={{flexGrow: 1, marginLeft: 2, marginRight: 2 }} name='month' label="month" dataSource={months()} component={renderAutoCompleteField}  />
                    <Field style={{flexGrow: 1, marginLeft: 2, marginRight: 2 }} name='description' label="description" component={renderTextField}  />
                    <br />
                    <FlatButton label='Select Staffs for this fieldwork' fullWidth primary onTouchTap={() => this.handleOpen() }/>
                </div>
                <SelectedStaffs selectedStaffs={this.props.selectedStaffs} removeSelectedStaff={this.props.removeSelectedStaff}/>

                <Dialog
                    modal={false}
                    open={this.state.openDialog}
                    onRequestClose={()=> this.handleClose()}
                    bodyStyle={{padding: 0}}
                    repositionOnUpdate={true}>
                    
                    <_Staff />

                </Dialog>

            </div>
        );
    }
}

const form =  reduxForm({  
	form: 'newFieldwork'
})

function mapStateToProps(state) {  
	return {
		selectedStaffs: state.ui.selectedStaffs
	}
}

export default connect(mapStateToProps, { removeSelectedStaff })(form(FieldWorkForm));