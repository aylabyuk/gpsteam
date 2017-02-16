import React, {Component} from 'react';
import Moment from 'moment';
import TimePicker from 'material-ui/TimePicker';
import IconButton from 'material-ui/IconButton';
import Clear from 'material-ui/svg-icons/content/clear';

const Clearable = ComposedComponent => class extends React.Component {

    clearDate (event) {
        event.preventDefault();

        // We manually reach into the composed component and set it's date to null.
        let newDate = '';
        this.refs.timePicker.setState({
            date: newDate
        }, () => {
            this.refs.timePicker.props.onChange(null, newDate);
        });
    }
    
    render () {
        return (
            <div style={{position: 'relative'}}>
                <ComposedComponent
                    { ...this.props.input }
                    autoOk={true}
                    ref="timePicker"
                    value={this.props.input.value !== '' ? new Date(this.props.input.value) : null}
                    onChange={(event, value) => {this.props.input.onChange(value)}} 
                    onBlur = {(value) => { value = '' } }
                    floatingLabelText={this.props.label}
                    format="24hr"/>
                {this.props.input.value &&
                <IconButton ref="button" onClick={this.clearDate.bind(this)} style={{position: 'absolute', bottom: '10px',right: '4px', padding: '0', width: '24px', height: '24px'}}>
                    <Clear />
                </IconButton>
                }
            </div>
        )
    }
};

export default Clearable(TimePicker);