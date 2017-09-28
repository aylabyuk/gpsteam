import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { normalizeUpperCase } from '../formValidators/formValidators'
import { toggleLogsheetViewerDrawer } from '../../actions/index'

// ui
import { AppBar, Paper, Card, LinearProgress, TextField, RaisedButton, IconButton, Popover } from 'material-ui' 
import Clear from 'material-ui/svg-icons/content/clear';
import NavigationClose  from 'material-ui/svg-icons/navigation/close';
import ChipInput from 'material-ui-chip-input'
import DateRangeComponent from './DateRangeComponent'


const LogSheetQuery = gql`query LogSheetQuery {
  allSite {
    id
    name
  }
}`;

const renderTextField = ({clear, fullWidth, clearIcon, input, label, meta: { touched, error }, ...custom }) => (
    <div style={{position: 'relative', display: 'inline-block', width: '100%'}}>
        <div style={{position: 'absolute', right: 12, top: 25, width: 20, height: 20}}>
            { clearIcon ? <IconButton tooltip="clear" tooltipPosition="top-center" onTouchTap={()=> clear() }>
                <Clear />
            </IconButton> : null}
        </div>
        <TextField
            floatingLabelText={label}
            errorText={touched && error}
            {...input}
            {...custom}
            fullWidth={fullWidth}
            />
    </div>
)

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      clearIcon: false,
      myChips: []
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleSelect(range){
        // console.log(range);
        // An object with two keys, 
        // 'startDate' and 'endDate' which are Momentjs objects. 

        let startDate = range.startDate.format('DD/MM/YYYY')
        let endDate = range.endDate.format('DD/MM/YYYY')
        
        this.props.change('daterange', startDate + ' to ' + endDate)
        this.setState({clearIcon: true})
  }

  handleClear(){
    this.props.change('daterange', '')
    this.setState({clearIcon: false})
  }

  handleDeleteChip(chip, index){
    let newData = this.state.myChips.slice()
    newData.splice(index, 1)
    this.setState({myChips: newData })
  }

  handleAddChip(chip){
    this.setState({myChips: this.state.myChips.concat([chip]) })
  }

  render() {
    let { loading, allSite } = this.props.data
      if(loading) {
        return <LinearProgress mode="indeterminate" />
      } else {
        return (
          <div style={{overflow: 'hidden' }}>
              <AppBar showMenuIconButton={false} title='Search Logsheets' iconElementRight={ <IconButton onTouchTap={()=> this.props.toggleLogsheetViewerDrawer()}><NavigationClose /></IconButton> }/>
              <div style={{ margin: '10px' }}>

                  <ChipInput
                      dataSource={allSite.map((s) => { return s.name })}
                      onRequestAdd={(chip) => this.handleAddChip(chip)}
                      onRequestDelete={(chip, index) => this.handleDeleteChip(chip, index)}
                      fullWidth
                      fullWidthInput
                      maxSearchResults={20}
                      listStyle={{ maxHeight: 200, overflow: 'auto' }}
                      floatingLabelText='site/s'
                  />

                  <Field onKeyPress={()=> {return false}} name='daterange' component={renderTextField} 
                    clear={this.handleClear.bind(this)} clearIcon={this.state.clearIcon} onFocus={this.handleTouchTap} fullWidth={true} label='date/s' />
                  <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                  >
                    <DateRangeComponent handleSelect={this.handleSelect.bind(this)}/>
                  </Popover >
              </div>
              <RaisedButton primary  label='search' fullWidth={true} />
          </div>
        );
      }
      
  }
}

const form =  reduxForm({  
	form: 'searchLogsheet'
})

export default connect(null, { toggleLogsheetViewerDrawer })(graphql(LogSheetQuery)(form(Filter)))