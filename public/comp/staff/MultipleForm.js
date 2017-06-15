import React, { Component } from 'react';
import { Field } from 'redux-form'
import { reduxForm, reset } from 'redux-form'
import { normalizePhone } from '../formValidators/formValidators'

// ui
import { TextField, FlatButton } from 'material-ui';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField 
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    fullWidth={true}
  />
)

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
        this.state = {
            numChildren: 1
        };
    }

    render () {
        const children = [];
        const name = this.props.name;

        for (var i = 1; i < this.state.numChildren; i += 1) {
            children.push(<CustField name={name+i} label={name+' '+i} key={i} normalize={ name == 'contactnumber' ? normalizePhone : null }/>);
        };

        return (
            <ParentComponent type={name} addChild={this.onAddChild.bind(this)} numChildren={this.state.numChildren}>
                {children}
            </ParentComponent>
        );
    }

    onAddChild () {
        this.setState({
            numChildren: this.state.numChildren + 1
        });
    }
}

class ParentComponent extends Component {
    render () {
        return(
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', marginBottom: '20px' }}>
                {this.props.children}
                <FlatButton style={ this.props.numChildren === 4 ? { display: 'none' } : null } label={'add ' + this.props.type} onTouchTap={this.props.addChild} secondary/>
            </div>
        )
    }
}

export default MultipleForm