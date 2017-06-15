import React, { PureComponent } from 'react';
import { connect } from 'react-redux'

// ui
import { FlatButton, Dialog, TextField } from 'material-ui'
import  ActionSearch from 'material-ui/svg-icons/action/search'

import StaffForm from '../staff/StaffForm'
import SelectedStaffs from '../staff/SelectedStaffs'
import { removeSelectedStaff } from '../../actions/index'


class ObserversFields extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            openDrawer: true
        }
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    }

    handleNew = () => {
        this.setState({openDrawer: true})
    }

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <h5 style={{marginTop: 40, textAlign: 'center', color: 'gray'}}>Observers</h5>
                <FlatButton label="Select" primary={true} onTouchTap={this.handleOpen} />
                <SelectedStaffs selectedStaffs={this.props.selectedStaffs} removeSelectedStaff={this.props.removeSelectedStaff}/>

                <Dialog
                    open={this.state.open}
                    autoScrollBodyContent={false}
                    bodyStyle={{padding: 0}}
                    onRequestClose={this.handleClose}
                    repositionOnUpdate={true} >
                    
                    <StaffForm openDrawer={this.state.openDrawer}/>
                    

                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state) {  
	return {
		selectedStaffs: state.ui.selectedStaffs
	}
}

export default connect(mapStateToProps, { removeSelectedStaff })(ObserversFields);