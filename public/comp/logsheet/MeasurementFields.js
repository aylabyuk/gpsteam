import React, { PureComponent } from 'react'
import { Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { onlyDecimal } from '../formValidators/formValidators'

//ui
import { TextField } from 'material-ui'

const renderTextField = ({ input, label, disabled, meta: { touched, error }, ...custom }) => (
  <TextField 
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    disabled={disabled}
  />
)


// this component holds the fields related to antenna height measurements
class MeasurementFields extends PureComponent {
    render() {
        // in readonly mode averageSlantHeight has a value
        let height = this.props.averageSlantHeight ?  this.props.averageSlantHeight : ''

        return (
            <div>
                <h5 style={{marginTop: 40, textAlign: 'center', color: 'gray'}}>Measurements</h5>
                <form style={{display: "flex", flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap'}}>
                    <div style={{flexGrow: 1}}><Field disabled={this.props.ro} name="north" component={renderTextField} label="north(meters)" normalize={onlyDecimal}/></div>
                    <div style={{flexGrow: 1}}><Field disabled={this.props.ro} name="east" component={renderTextField} label="east(meters)" normalize={onlyDecimal}/></div>
                    <div style={{flexGrow: 1}}><Field disabled={this.props.ro} name="south" component={renderTextField} label="south(meters)" normalize={onlyDecimal}/></div>
                    <div style={{flexGrow: 1}}><Field disabled={this.props.ro} name="west" component={renderTextField} label="west(meters)" normalize={onlyDecimal}/></div>
                    {/*  the slant antenna height is automatically computed when all of the 4 fields above contains values  */}
                    <div style={{flexGrow: 1}}><TextField floatingLabelText="slant height(meters)" disabled={true} value={height} /></div>
                    <div style={{flexGrow: 1}}><Field disabled={this.props.ro} name="azimuth" component={renderTextField} label="azimuth(degrees)" normalize={onlyDecimal}/></div>
                </form>
            </div>
        );
    }
}

const selector = formValueSelector('logsheet') 
MeasurementFields = connect(
  state => {
    // select values already in the redux store and assign each one on a variable
    const n = parseFloat(selector(state, 'north'))
    const e = parseFloat(selector(state, 'east'))
    const s = parseFloat(selector(state, 'south'))
    const w = parseFloat(selector(state, 'west'))

    // dynamically compute the averageSlantHeight and return it as props to MeasurementFields component
    const averageSlantHeight = (n + e + s + w) / 4

    return {
      averageSlantHeight
    }
  }
)(MeasurementFields)

export default MeasurementFields;