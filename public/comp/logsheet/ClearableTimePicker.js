import React, {Component} from 'react';
import Moment from 'moment';
import TimePicker from 'material-ui/TimePicker';
import IconButton from 'material-ui/IconButton';
import Clear from 'material-ui/svg-icons/content/clear';

const Clearable = ComposedComponent => class extends React.Component {

    clearDate (event) {
        event.preventDefault();
        // We manually reach into the composed component using ref (reference name) and set it's date to blank.
        let newDate = '';
        this.refs.timePicker.setState({
            date: newDate
        }, () => {
            this.refs.timePicker.props.onChange(null, newDate);
        });
    }
    
    // we are using a composed component simply because we need to add an IconButton that will function as a clear button for the timePicker
    render () {
        let { meta } = this.props
        return (
            <div style={{position: 'relative', flexGrow: 1}}>
                <ComposedComponent
                    { ...this.props.input }
                    autoOk={false}
                    ref="timePicker"
                    value={this.props.input.value !== '' ? new Date(this.props.input.value) : null}
                    onChange={(event, value) => {this.props.input.onChange(value)}} 
                    onBlur = {(value) => { value = '' } }
                    floatingLabelText={this.props.label}
                    format="24hr"
                    errorText = {meta.touched && meta.error} 
                    disabled={this.props.disabled}/>
                {this.props.input.value && !this.props.disabled &&
                <IconButton ref="button" onClick={this.clearDate.bind(this)} style={{position: 'absolute', bottom: '10px',right: '4px', padding: '0', width: '24px', height: '24px'}}
                    tooltip="clear" tooltipPosition="top-center" >
                    <Clear />
                </IconButton>
                }
            </div>
        )
    }
};

// exporting the clearable component as Higer order Component of a TimePicker
export default Clearable(TimePicker);