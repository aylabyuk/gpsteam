import React, { Component } from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { normalizeUpperCase } from '../formValidators/formValidators'
import { toggleSearchLogsheet } from '../../actions/index'

// ui
import { AppBar, Paper, Card, LinearProgress, TextField, FlatButton, IconButton } from 'material-ui' 
import Clear from 'material-ui/svg-icons/content/clear';
import ActionSearch from 'material-ui/svg-icons/action/search'
import NavigationClose  from 'material-ui/svg-icons/navigation/close';
import ChipInput from 'material-ui-chip-input'
import DatepickerComponent from './DatepickerComponent'

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

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

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
          <div style={{ margin: '10px', width: '800px',  maxWidth: '800px', height: window.outerHeight - 64 }}>

              <ChipInput
                  dataSource={allSite.map((s) => { return s.name })}
                  onRequestAdd={(chip) => this.handleAddChip(chip)}
                  onRequestDelete={(chip, index) => this.handleDeleteChip(chip, index)}
                  fullWidth
                  maxSearchResults={20}
                  listStyle={{ maxHeight: 200, overflow: 'auto' }}
                  floatingLabelText='site/s'
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'  }}>
                <DatepickerComponent />

                <FlatButton secondary icon={<ActionSearch />}  label='search' />
              </div>
          </div>
              
        );
      }
      
  }
}

export default connect(null, { toggleSearchLogsheet })(graphql(LogSheetQuery)(Filter))