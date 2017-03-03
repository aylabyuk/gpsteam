import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'

//ui
import { Dialog, FlatButton, TextField } from 'material-ui'

const renderTextField = ({ input, label, fullWidth, meta: { touched, error }, ...custom }) => (
  <TextField 
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    fullWidth={fullWidth}
  />
)

class NewContactDialog extends Component {

    handleAdd(d) {
       console.log(d)
    }

    render() {
        const actions = [
        <FlatButton
            label="Add New Contact"
            primary={true}
            onTouchTap={this.props.handleSubmit(this.handleAdd)}
        />,
        <FlatButton
            label="Cancel"
            primary={true}
            disabled={false}
            onTouchTap={this.props.close}
        />,
        ];

        return (
            <Dialog 
                title='New Contact'
                actions={actions}
                open={this.props.open}
                repositionOnUpdate={false}
            >
            <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between'}} >
                <Field style={{flexGrow: 2, marginLeft: 2, marginRight: 2 }} name='first_name' label="firstname(required)" component={renderTextField}  />
                <Field style={{flexGrow: 2, marginLeft: 2, marginRight: 2 }} name='last_name' label="lastname(required)" component={renderTextField}  />
                <Field style={{flexGrow: 2, marginLeft: 2, marginRight: 2 }} name='contact_number' label="contact number(required)" component={renderTextField}  />
                <Field style={{flexGrow: 2, marginLeft: 2, marginRight: 2 }} name='email_add' label="email" component={renderTextField}  />
                <Field style={{flexGrow: 2, marginLeft: 2, marginRight: 2 }} name='organization' label="organization" component={renderTextField}  />
                <Field style={{flexGrow: 2, marginLeft: 2, marginRight: 2 }} name='position' label="position" component={renderTextField}  />
                <Field style={{flexGrow: 2 }} name='address_one' fullWidth={true} label="address 1" component={renderTextField}  />
                <Field style={{flexGrow: 2 }} name='address_two' fullWidth={true} label="address 2" component={renderTextField}  />
                <Field style={{flexGrow: 2, marginLeft: 2, marginRight: 2 }} name='city' label="city" component={renderTextField}  />
                <Field style={{flexGrow: 2, marginLeft: 2, marginRight: 2 }} name='province' label="province" component={renderTextField}  />
            </div>

            </Dialog>
        );
    }
}

const form =  reduxForm({  
	form: 'newContact'
})

export default form(NewContactDialog);