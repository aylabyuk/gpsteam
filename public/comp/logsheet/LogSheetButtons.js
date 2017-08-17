import React, { Component } from 'react';
import { Paper, AppBar, Divider } from 'material-ui';
import { connect } from 'react-redux'
import { reset, reduxForm } from 'redux-form';
import { resetSelectedStaffs, resetContactId, toggleLogsheetSubmitting } from '../../actions/index';
import { apolloClient } from '../../_primary'
import { compose } from 'react-apollo'
 
import { RaisedButton, CircularProgress, Snackbar, FloatingActionButton } from 'material-ui';
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Send from 'material-ui/svg-icons/content/send'
import Check from 'material-ui/svg-icons/navigation/check'
import Error from 'material-ui/svg-icons/alert/error'
import { orange700 as circColor, red400 } from 'material-ui/styles/colors'

import { setLogsheetMode } from '../../actions/index'
import { addNewLogSheet, updateLogSheet, checkDuplicate } from '../../gqlFiles/logsheetgql'

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

// code for getting the daty of year using the date value.
Date.prototype.julianDate = function(){
    var j=parseInt((this.getTime()-new Date('Dec 30,'+(this.getFullYear()-1)+' 23:00:00').getTime())/86400000).toString(),
    i=3-j.length;
    while(i-->0)j=0+j;
    return j
}

// this is the styling object for the floating action button (FAB)
const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
}

// styling for the circular progress behind the FAB
const circStyle = {
    margin: 0,
    top: 'auto',
    right: 18.5,
    bottom: 18,
    left: 'auto',
    position: 'fixed',
    zIndex: 9999
}

// this component handles all submission related functionality of the logsheet form
class LogSheetButtons extends Component {
    constructor(props) {
    super(props);
        this.state = {
            open: false,
            message: '',
            submitSuccess: false
        };
    }

    // everytime there is an message available to display and the the open state is true..
    // show the snackbar
    toggleSnackbar(open, message) {
        this.setState({open, message})
    } 

    // at the specified period of time after the snackbar is displayed the open state of the component will be changed to false
    handleRequestClose = () => {
        this.setState({
        open: false,
        });
    };

    // ressetting the logsheet requires calling all the methods that will trigger the actions to the redux store
    // these methods are accessible via props
    handleReset() {
        this.props.dispatch(reset('logsheet'));
        this.props.resetContactId()
        this.props.resetSelectedStaffs()

        this.props.setLogsheetMode('new')

        // wait for about 5 seconds before setting the submitSuccess state to false
        // this submit button or FAB will listen to this state which will control its visibility
        setTimeout(function() { this.setState({submitSuccess: false}); }.bind(this), 5000);

    }

    // method for updating the logsheet information
    handleUpdateLog(d) {
        console.log('submitting data', d)
        this.props.toggleLogsheetSubmitting()

        let observers = [], selectedSite, aveSlantHeight, contact

        // add all selected staff to the observers array
        this.props.selectedStaffs.map((x)=> {
            observers.push({ id: x.id })
        })

        // find the sitename in the siteNames array
        selectedSite = this.props.siteNames.find((site)=> {
            return site.name == d.sitename
        })

        // if not found then issue an error to the snackbar
        if(selectedSite == undefined) {
            this.props.toggleLogsheetSubmitting()
            this.toggleSnackbar(true, 'FAILED: ' + d.sitename + ' is not a valid site')
            return 0
        }

        // average slant antenna height will be computed using the measurement fields
        aveSlantHeight = (parseFloat(d.north) + parseFloat(d.east) + parseFloat(d.south) + parseFloat(d.west)) / 4


        // If all validation and verification is ok.. call the snackbar component and issue a message that is currently submitting
        this.toggleSnackbar(this.props.logsheetSubmitting, 'submitting logsheet information, please wait')

        // map everything to a variable accordingly
        // then call the updateLogsheet mutation
        this.props.updateLogsheet({variables: {
            id: d.id,
            survey_type: 'CAMPAIGN',
            logsheet_date: new Date(d.logdate),
            julian_day: d.logdate.julianDate(),
            marker: d.marker,
            location: d.location,
            observers: observers,
            siteId: selectedSite.id,
            north: d.north,
            east: d.east,
            south: d.south,
            west: d.west,
            time_start: d.startTime,
            time_end: d.endTime,
            azimuth: d.azimuth,
            failure_time: d.failureTime,
            receiver_status: d.receiverStatus,
            antenna_status: d.antennaStatus,
            rod_num: d.rodNo,
            rod_correction: d.rodCorrection,
            avg_slant_height: aveSlantHeight,
            ip_add: d.ipAddress,
            netmask: d.netmask,
            gateway: d.gateway,
            dns: d.dns,
            local_tcp_port: d.localTcpPort,
            latitude: d.lat,
            longitude: d.long,
            observed_situation: d.unusualAbnormalObservation,
            lodging_road_information: d.lodgingOrRoadInfo,
            others: d.pertinentInfo,
            antennaId: d.antennaSN,
            receiverId: d.receiverSN,
            contactPersonId: this.props.selectedContact ? this.props.selectedContact.id : null
        } }).then((data) => {
            // log the returned data after mutation
            console.log('got data', data);
            this.setState({ submitSuccess: 'true' })
            // change the logsheetSubmitting state and then call the snackbar component again and issue a message
            this.props.toggleLogsheetSubmitting()
            this.toggleSnackbar(!this.props.logsheetSubmitting, 'logsheet information successfully updated')
            // reset the form after submission
            this.handleReset()
        }).catch((err) => {
            // issue a message to the snackbar that will say that the update has failed in case of an error
            console.log('there was an error sending the query: ', err);
            this.props.toggleLogsheetSubmitting()
            this.toggleSnackbar(true, 'logsheet information update failed, try again')
        })
    }

    // this method is almost similar to the handleUpdateLog but uses a different mutation called addNewLogsheet
    handleSubmitLog(d) {
      
        // check if logsheet has possible duplicate
        // apolloClient.query({query: checkDuplicate, variables: { name: d.sitename, date: new Date(d.logdate) }})
        //     .then((result) => {
        //         if(result) {
        //             console.log('possible duplicate: ', result)
        //             return 0
        //         }
        //     })

        console.log('submitting data', d)
        this.props.toggleLogsheetSubmitting()

        let observers = [], selectedSite, aveSlantHeight, contact

        this.props.selectedStaffs.map((x)=> {
            observers.push({ id: x.id })
        })

        // test if sitename is one of the list
        selectedSite = this.props.siteNames.find((site)=> {
            return site.name == d.sitename
        })
        if(selectedSite == undefined) {
            this.props.toggleLogsheetSubmitting()
            this.toggleSnackbar(true, 'FAILED: ' + d.sitename + ' is not a valid site')
            return 0
        }

        aveSlantHeight = (parseFloat(d.north) + parseFloat(d.east) + parseFloat(d.south) + parseFloat(d.west)) / 4

        this.toggleSnackbar(this.props.logsheetSubmitting, 'submitting logsheet information, please wait')

        this.props.addNewLogsheet({ variables: {
            survey_type: 'CAMPAIGN',
            logsheet_date: new Date(d.logdate),
            julian_day: d.logdate.julianDate(),
            marker: d.marker,
            location: d.location,
            observers: observers,
            siteId: selectedSite.id,
            north: d.north,
            east: d.east,
            south: d.south,
            west: d.west,
            time_start: d.startTime,
            time_end: d.endTime,
            azimuth: d.azimuth,
            failure_time: d.failureTime,
            receiver_status: d.receiverStatus,
            antenna_status: d.antennaStatus,
            rod_num: d.rodNo,
            rod_correction: d.rodCorrection,
            avg_slant_height: aveSlantHeight,
            ip_add: d.ipAddress,
            netmask: d.netmask,
            gateway: d.gateway,
            dns: d.dns,
            local_tcp_port: d.localTcpPort,
            latitude: d.lat,
            longitude: d.long,
            observed_situation: d.unusualAbnormalObservation,
            lodging_road_information: d.lodgingOrRoadInfo,
            others: d.pertinentInfo,
            antennaId: d.antennaSN,
            receiverId: d.receiverSN,
            contactPersonId: this.props.selectedContact ? this.props.selectedContact.id : null
        } }).then((data) => {
            console.log('got data', data);
            this.setState({ submitSuccess: 'true' })
            this.props.toggleLogsheetSubmitting()
            this.toggleSnackbar(!this.props.logsheetSubmitting, 'logsheet information successfully submitted')
            this.handleReset()
        }).catch((error) => {
            console.log('there was an error sending the query: ', error);
            this.props.toggleLogsheetSubmitting()
            this.toggleSnackbar(true, 'logsheet information submission failed, try again')
        });
    }

    render() {
        let { logsheetSubmitting, submitFailed, pristine, dirty, invalid, valid, setLogsheetMode, handleSubmit, logsheetMode } = this.props
        let { submitSuccess } = this.state

        let submitAction
        if(logsheetMode == 'new') {
            submitAction = handleSubmit(this.handleSubmitLog.bind(this))
        } else {
            submitAction = handleSubmit(this.handleUpdateLog.bind(this))
        }

        return (
            <div style={{marginBottom: '40px'}}>
                {
                    this.props.ro ? <FloatingActionButton onTouchTap={()=> setLogsheetMode('write') } style={fabStyle} ><Edit /></FloatingActionButton> :
                        <div>
                            
                            {
                                logsheetSubmitting && !submitSuccess ? 
                                <CircularProgress size={60} color={circColor} style={circStyle}/>
                                : null 
                            }

                            { !submitSuccess ? <FloatingActionButton style={fabStyle} onTouchTap={submitAction} >
                                    <Send />
                            </FloatingActionButton> : null }

                            { submitSuccess && pristine ? <FloatingActionButton backgroundColor={circColor} style={fabStyle} >
                                    <Check />
                            </FloatingActionButton> : null }

                            { submitFailed && invalid ? <FloatingActionButton backgroundColor={red400} style={fabStyle} >
                                    <Error />
                            </FloatingActionButton> : null }
                            
                        </div>
                }

                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {  
	return {
		selectedStaffs: state.ui.selectedStaffs,
        selectedContact: state.ui.selectedContact,
        logsheetSubmitting: state.ui.logsheetSubmitting,
        logsheetMode: state.ui.logsheetMode
	}
}

const form =  reduxForm({  
	form: 'logsheet'
})

const ComposedMutations = compose( 
    graphql(addNewLogSheet, { name: 'addNewLogsheet' }), graphql(updateLogSheet, { name: 'updateLogsheet' })
)(form(LogSheetButtons))

export default connect(mapStateToProps, { resetContactId, resetSelectedStaffs, toggleLogsheetSubmitting, setLogsheetMode })(ComposedMutations)