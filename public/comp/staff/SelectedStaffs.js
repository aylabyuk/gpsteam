import React, { Component } from 'react';
import { connect } from 'react-redux'

// ui
import { Paper, Chip, Avatar } from 'material-ui';
import {blue300, indigo900} from 'material-ui/styles/colors';

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


class SelectedStaffs extends Component {

    handleRequestDelete(id) {
       this.props.removeSelectedStaff(id)
    }

    handleTouchTap() {
        alert('You clicked the Chip.');
    }

    render() {
        return (
            <div style={styles.container}>

            {this.props.selectedStaffs.map((s)=>{
                return(
                <Chip
                    onRequestDelete={()=> this.handleRequestDelete(s.id)}
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