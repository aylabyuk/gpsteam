import React, { Component } from 'react';
import { Field } from 'redux-form'
import { reduxForm, reset } from 'redux-form'
import { validateStaffInfo as validate } from './validateStaffInfo'

//component
import StaffList from './StaffList'

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

//ui
import { Paper, AppBar, TextField, AutoComplete, Drawer, 
        FlatButton, RaisedButton, List, ListItem, DatePicker, Snackbar } from 'material-ui';
import MultipleForm from './MultipleForm'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField 
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    fullWidth={true}
  />
)

const renderAutoCompleteField = ({ input, label, dataSource, meta: { touched, error } }) => (
    <AutoComplete
        errorText = {touched && error} 
        floatingLabelText={label}
        filter={AutoComplete.caseInsensitiveFilter}
        openOnFocus={true}
        dataSource={dataSource}
        listStyle={{ maxHeight: 200, overflow: 'auto' }}
        onUpdateInput={input.onChange}
        searchText={input.value}
        maxSearchResults={10}
        openOnFocus={true}
        fullWidth={true}
    />
)

const renderDatePicker = ({ input, label, defaultValue, meta: { touched, error } }) => (
    <DatePicker 
        mode='portrait'
        errorText = {touched && error} 
        {...input}
        value = {input.value !== ''? new Date(input.value) : null}
        formatDate={new Intl.DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
        }).format}
        hintText={label}
        floatingLabelText={label}
        onChange = {(event, value) => {input.onChange(value)} } 
        onBlur = {(value) => { value = '' }}
        fullWidth={true}/>
)

const style = {
  margin: 2,
  display: 'inline-block',
  padding: 10,
  maxWidth: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column'
};

const addNewStaff = gql`
    mutation addNewStaff(
        $first_name: String!
        $last_name: String!
        $nickname: String!
        $position_id: Int!
        $division_id: Int!
        $office_location: String!
        $birthday: Date!
        $contact_numbers: [ContactNumberInput]
        $emails: [EmailInput]
    ) {
        newStaff: createStaff( input: {
            first_name: $first_name
            last_name: $last_name
            nickname: $nickname
            position_id: $position_id
            division_id: $division_id
            office_location: $office_location
            birthday: $birthday
            contact_numbers: $contact_numbers
            emails: $emails
       } ) {
            id
            first_name
            last_name
        }
    }
`

const StaffQuery = gql`query StaffQuery {
  allPosition {
    id
    position_name
  }
  allDivision{
    id
    division_name
  }
  
}`;

class StaffForm extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false, openSnackBar: false, snackBarMsg: ''};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleToggleSnackBar(msg) {
        this.setState({
            snackBarMsg: msg,
            openSnackBar: !this.state.openSnackBar
        });
    }

    handleRequestClose = () => {
        this.setState({
            openSnackBar: false,
            snackBarMsg: ''
        });
    };

    handleReset() {
        this.props.dispatch(reset('newStaff'));
    }

    handleSubmitStaff(d) {
        console.log(d)

        let pos = this.props.data.allPosition.find((x) => x.position_name == d.positionName)
        let div = this.props.data.allDivision.find((x) => x.division_name == d.divisionName)

        this.props.mutate({ variables: {
            first_name: d.firstName,
            last_name: d.lastName,
            nickname: d.nickName,
            position_id: pos.id,
            division_id: div.id,
            office_location: d.officeLocation,
            birthday: d.birthday,
            emails: [
                    { address:  d.email1},
                    { address:  d.email2},
                    { address:  d.email3}
            ],
            contact_numbers:[
                    {number: d.contactnumber1},
                    {number: d.contactnumber2},
                    {number: d.contactnumber3},
            ]
        } }).then((data) => {
            let d = data.data.newStaff
            console.log('got new staff data', d);
            let msg = 'New Staff Created: ' + d.first_name + ' ' + d.last_name
            this.handleToggleSnackBar(msg)
            this.handleReset()
        }).catch((error) => {
            console.log('there was an error sending the query: ', error);
            let msg = 'an error has occured'
            this.handleToggleSnackBar(msg)
        });

    }

    render() {
        let { loading, allPosition, allDivision, allStaff } = this.props.data

        if(loading) {
            return <div>loading..</div>
        } else {
            return (
                <Paper style={style} zDepth={1}>
                    <AppBar
                        title="Manage Staff"
                        iconElementRight={<FlatButton label="Create New" onTouchTap={this.handleToggle} />}
                    />
                    {/*<StaffList data={this.props.data} />*/}
                    <Drawer width={300} openSecondary={true} open={this.state.open} docked={true} onRequestChange={(open) => this.setState({open})}>
                        <div style={{padding: 10}}>
                            <RaisedButton label="Close" secondary fullWidth onTouchTap={this.handleToggle}/>
                            <Field name='firstName' label="first name" component={renderTextField}  />
                            <Field name='lastName' label="last name" component={renderTextField}  />
                            <Field name='nickName' label="nick name" component={renderTextField}  />
                            <Field name='birthday' label="birthday" component={renderDatePicker} autoOk={false}/>
                            <Field name='positionName' label="position" component={renderAutoCompleteField}  dataSource={allPosition.map((a) => { return a.position_name })}/>
                            <Field name='divisionName' label="division" component={renderAutoCompleteField}  dataSource={allDivision.map((a) => { return a.division_name })} />
                            <Field name='officeLocation' label="office location" component={renderTextField}  />
                            <MultipleForm name='email' />
                            <MultipleForm name='contactnumber' />
                            <RaisedButton label="Add" primary fullWidth onTouchTap={this.props.handleSubmit(this.handleSubmitStaff.bind(this))}/>
                        </div>
                    </Drawer>
                    <Snackbar
                        open={this.state.openSnackBar}
                        message={this.state.snackBarMsg}
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                    />
                </Paper>
            );
        }
    }
}

const form =  reduxForm({  
	form: 'newStaff',
    validate
})

export default graphql(addNewStaff)(graphql(StaffQuery)(form(StaffForm)));