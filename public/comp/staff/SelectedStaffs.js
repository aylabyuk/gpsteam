import React, { Component } from 'react';
import { connect } from 'react-redux'

// ui
import { Paper, Chip, Avatar } from 'material-ui';
import {blue300, indigo900} from 'material-ui/styles/colors';

// see: http://www.material-ui.com/#/components/chip

// set the styling for the chips and the container components 
const styles = {
  chip: {
    margin: 4,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
};

// This component will render all the selected staff using the staffForm
// This is visible in the LogsheetForm component
class SelectedStaffs extends Component {

    // when deleting a chip we must issue an action to the global redux store (removeSelectedStaff) using the staff id as parameter
    handleRequestDelete(id) {
        if (this.props.ro) {
            alert('cannot remove on read only mode')
        } else {  
            this.props.removeSelectedStaff(id)
        }
    }

    // use this function to issue commands or codes when user clicks the chips
    handleTouchTap() {
        alert('You clicked the Chip.');
    }

    render() {

        return (
            <div style={styles.container}>

                {/* map all selected staff and render each as a chip using the staff initial as the avatar for the chip */}
                {this.props.selectedStaffs.map((s)=>{
                    return(
                        <Chip
                            onRequestDelete={() => this.handleRequestDelete(s.id)}
                            onTouchTap={this.handleTouchTap}
                            style={styles.chip}
                            key={s.id}>
                            <Avatar size={32} >
                                {s.initials}
                            </Avatar>
                            {s.nname}
                        </Chip> )
                })}

            </div>
        );
    }
}


export default SelectedStaffs;