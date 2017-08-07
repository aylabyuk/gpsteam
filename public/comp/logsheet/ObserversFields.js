import React, { PureComponent } from 'react';
import { connect } from 'react-redux'

// ui
import { FlatButton, Dialog, TextField } from 'material-ui'
import  ActionSearch from 'material-ui/svg-icons/action/search'

import StaffForm from '../staff/StaffForm'
import SelectedStaffs from '../staff/SelectedStaffs'
import { removeSelectedStaff } from '../../actions/index'

// This component will handle observer related data changes and management
class ObserversFields extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            // this states control the dialogs in this component
            open: false,
            openDrawer: true
        }
    }

    // the tree succeeding methods ( handleOpen, handleClose, handleNew ) modifies the local ui state (dialog) for the component 
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
                {
                    this.props.ro ? null : <FlatButton label="Select" primary={true} onTouchTap={this.handleOpen} /> 
                }
                <SelectedStaffs ro={this.props.ro} selectedStaffs={this.props.selectedStaffs} removeSelectedStaff={this.props.removeSelectedStaff}/>

                <Dialog
                    open={this.state.open}
                    autoScrollBodyContent={false}
                    bodyStyle={{padding: 0}}
                    onRequestClose={this.handleClose}
                    repositionOnUpdate={true} >
                    
                    {/* a subcomponent staffForm is used whithin the dialog  */}
                    <StaffForm openDrawer={this.state.openDrawer}/>
                    

                </Dialog>
            </div>
        );
    }
}

// mapping the global state selectedStaffs as props
function mapStateToProps(state) {  
	return {
		selectedStaffs: state.ui.selectedStaffs
	}
}

// connect the HOC mapstateToprops and action removeSelectedStaff to the exported ObserversFields component 
export default connect(mapStateToProps, { removeSelectedStaff })(ObserversFields);