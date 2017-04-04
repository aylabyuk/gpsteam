import React, { Component } from 'react';
import { Field } from 'redux-form'
import { reduxForm } from 'redux-form'

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

//ui
import { Paper, AppBar, TextField, AutoComplete, Drawer, FlatButton, RaisedButton, List, ListItem, DatePicker } from 'material-ui';

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
        onBlur = {(value) => { value = '' }}/>
)

const style = {
  margin: 2,
  display: 'inline-block',
  padding: 10,
  maxWidth: '100vw',
  display: 'flex',
  flexDirection: 'column'
};

const addNewStaff = gql`
    mutation addNewStaff(
        $first_name: STRING!
        $last_name: STRING!
        $nickname: STRING!
        $position_name: STRING!
        $contact_num: STRING!
        $division_name: STRING!
        $email_address: STRING!
        $office_location: STRING!
        $birthday: STRING!
    ) {
        newStaff: createStaff(
            first_name: $first_name
            last_name: $last_name
            nickname: $nickname
            position: $position_name
            contact_num: $contact_num
            division_name: $division_name
            email_address: $email_address
            office_location: $office_location
            birthday: $birthday
        ) {
            id
            first_name
            last_name
        }
    }
`

const StaffQuery = gql`query StaffQuery {
  allPosition {
    position_name
  }
  allDivision{
    division
  }
  allStaff {
    first_name
    last_name
    nickname
    position_name
    contact_num
    division_name
    email_address
    office_location
    birthday
  }
}`;

class StaffForm extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});


    render() {
        let { loading, allPosition, allDivision } = this.props.data

        if(loading) {
            return <div>loading..</div>
        } else {
            return (
                <Paper style={style} zDepth={1}>
                    <AppBar
                        title="Manage Staff"
                        iconElementRight={<FlatButton label="Create New" onTouchTap={this.handleToggle} />}
                    />        
                    <Drawer width={300} openSecondary={true} open={this.state.open} docked={true} onRequestChange={(open) => this.setState({open})}>
                        <div style={{padding: 10}}>
                            <RaisedButton label="Close" secondary fullWidth onTouchTap={this.handleToggle}/>
                            <Field name='firstName' label="first name" component={renderTextField}  />
                            <Field name='lastName' label="last name" component={renderTextField}  />
                            <Field name='nickName' label="nick name" component={renderTextField}  />
                            <Field name='contactNum' label="contact number" component={renderTextField}  />
                            <Field name='email' label="email address" component={renderTextField}  />
                            <Field name='birthday' label="birthday" component={renderDatePicker} autoOk={false}/>
                            <Field name='positionName' label="position" component={renderAutoCompleteField}  dataSource={allPosition.map((a) => { return a.position_name })}/>
                            <Field name='divisionName' label="division" component={renderAutoCompleteField}  dataSource={allDivision.map((a) => { return a.division })} />
                            <Field name='officeLocation' label="office location" component={renderTextField}  />
                            <RaisedButton label="Add" primary fullWidth />
                        </div>
                    </Drawer>

                </Paper>
            );
        }
    }
}

const form =  reduxForm({  
	form: 'newStaff'
})

export default graphql(addNewStaff)(graphql(StaffQuery)(form(StaffForm)));