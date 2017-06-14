import React, { Component } from 'react'
import { Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { onlyDecimal } from '../formValidators/formValidators'

//ui
import { TextField } from 'material-ui'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField 
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class MeasurementFields extends Component {
    render() {
        let height = this.props.averageSlantHeight ?  this.props.averageSlantHeight : ''

        return (
            <div>
                <h5 style={{marginTop: 40, textAlign: 'center', color: 'gray'}}>Measurements</h5>
                <form style={{display: "flex", flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap'}}>
                    <div style={{flexGrow: 1}}><Field name="north" component={renderTextField} label="north(meters)" normalize={onlyDecimal}/></div>
                    <div style={{flexGrow: 1}}><Field name="east" component={renderTextField} label="east(meters)" normalize={onlyDecimal}/></div>
                    <div style={{flexGrow: 1}}><Field name="south" component={renderTextField} label="south(meters)" normalize={onlyDecimal}/></div>
                    <div style={{flexGrow: 1}}><Field name="west" component={renderTextField} label="west(meters)" normalize={onlyDecimal}/></div>
                    <div style={{flexGrow: 1}}><TextField floatingLabelText="slant height(meters)" disabled={true} value={height} /></div>
                    <div style={{flexGrow: 1}}><Field name="azimuth" component={renderTextField} label="azimuth(degrees)" normalize={onlyDecimal}/></div>
                </form>
            </div>
        );
    }
}

const selector = formValueSelector('logsheet') 
MeasurementFields = connect(
  state => {
    const n = parseFloat(selector(state, 'north'))
    const e = parseFloat(selector(state, 'east'))
    const s = parseFloat(selector(state, 'south'))
    const w = parseFloat(selector(state, 'west'))

    const averageSlantHeight = (n + e + s + w) / 4

    return {
      averageSlantHeight
    }
  }
)(MeasurementFields)

export default MeasurementFields;