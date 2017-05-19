import React, { Component } from 'react';

import { reduxForm, Field } from 'redux-form'
import { TextField, AutoComplete, FlatButton, Dialog } from 'material-ui'
import { connect } from 'react-redux'
import { removeSelectedStaff, resetSelectedStaffs } from '../../actions/index'

import { years, months } from '../formValidators/formValidators'

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
      filter={AutoComplete.noFilter}
      openOnFocus={true}
      dataSource={dataSource}
      listStyle={{ maxHeight: 200, overflow: 'auto' }}
      onUpdateInput={input.onChange}
      searchText={input.value}
      errorText={touched && error}
      textFieldStyle={{width: '100%'}}
    />
)

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

    componentWillUnmount() {
        this.props.resetSelectedStaffs()
    }
    

    render() {

        const style = { 
            flexGrow: 1,
            marginLeft: 2,
            marginRight: 2
        }

        return (
            <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between'}} >
                    <Field style={style} name='year' label="year" dataSource={years()} component={renderAutoCompleteField} />
                    <Field style={style} name='month' label="month" dataSource={months()} component={renderAutoCompleteField}  />
                    <Field style={style} name='description' label="description" component={renderTextField}  />         
                    <FlatButton style={{marginTop: '30px'}} label='Select Staffs for this fieldwork' fullWidth primary onTouchTap={() => this.handleOpen() }/>
                </div>
                <SelectedStaffs style={{textAlign: "center"}} selectedStaffs={this.props.selectedStaffs} removeSelectedStaff={this.props.removeSelectedStaff}/>

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


export default connect(null, { removeSelectedStaff, resetSelectedStaffs })(FieldWorkForm);