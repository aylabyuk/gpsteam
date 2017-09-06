import React, { Component } from 'react';
import { Field } from 'redux-form'
import { reduxForm, reset } from 'redux-form'
import { normalizePhone } from '../formValidators/formValidators'

// ui
import { TextField, FlatButton } from 'material-ui';


// This module contains the hierarchy of components to be used for the staffForm.
// We need this to create a dynamic addition of fields (email and contact number) since staffs can have a maximum of 3 available emails and contactnumbers

// a regular Material-ui Textfield will be used as rendered component for each field 
const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField 
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    fullWidth={true}
  />
)

// The Custom Field will render the actual Field component that will call the renderTextField with proper labeling and normalization. thanks to redux-form
class CustField extends Component {
    render() {
        return (
            <Field name={this.props.name} label={this.props.label} component={renderTextField} normalize={this.props.normalize} /> 
        )
    }
}

class MultipleForm extends Component {
    constructor (props) {
        super(props);
        // the number of children is monitored or set using state
        this.state = {
            numChildren: 1
        };
    }

    render () {
        // we will store all components in the children array
        const children = [];
        const name = this.props.name;

        // a custom field is made with a unique name (email or contact number) + the value of i in this for loop
        // each iteration will push a custom field to the children[] array
        // normalization is set depending on the name 
        // if name is 'contactnumber' then normalizePhone is used
        for (var i = 1; i < this.state.numChildren; i += 1) {
            children.push(<CustField name={name+i} label={name+' '+i} key={i} normalize={ name == 'contactnumber' ? normalizePhone : null }/>);
        };

        return (
            // The ParentComponent is called with the children supplied to it as props
            // onAddChild function is passed as attribute to the element
            <ParentComponent type={name} addChild={this.onAddChild.bind(this)} numChildren={this.state.numChildren}>
                {children}
            </ParentComponent>
        );
    }

    // when the button is clicked this function will run incrementing the numChildren state by 1
    onAddChild () {
        this.setState({
            numChildren: this.state.numChildren + 1
        });
    }
}


// parent component renderes this.props.children which contains all child components
class ParentComponent extends Component {
    render () {
        return(
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', marginBottom: '20px' }}>
                {this.props.children}
                {/* When a user clicked this button the addChild function will be called */}
                <FlatButton style={ this.props.numChildren === 4 ? { display: 'none' } : null } label={'add ' + this.props.type} onTouchTap={this.props.addChild} secondary/>
            </div>
        )
    }
}

export default MultipleForm