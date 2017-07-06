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

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


Date.prototype.julianDate = function(){
    var j=parseInt((this.getTime()-new Date('Dec 30,'+(this.getFullYear()-1)+' 23:00:00').getTime())/86400000).toString(),
    i=3-j.length;
    while(i-->0)j=0+j;
    return j
};

const addNewLogSheet = gql`
    mutation createLogsheet(
        $survey_type: String!
        $logsheet_date: Date!
        $julian_day: Int
        $location: String!
        $marker: String
        $observers: [StaffIdInput]!
        $siteId: Int!
        $north: Float!
        $east: Float!
        $south: Float!
        $west: Float!
        $time_start: String
        $time_end: String
        $azimuth: Int
        $failure_time: String
        $receiver_status: String
        $antenna_status: String
        $rod_num: Int
        $rod_correction: Int
        $avg_slant_height: Float
        $ip_add: String
        $netmask: String
        $gateway: String
        $dns: String
        $local_tcp_port: String
        $latitude: Float
        $longitude: Float
        $observed_situation: String
        $lodging_road_information: String
        $others: String
        $antennaId: String!
        $receiverId: String!
        $contactPersonId: Int
  ) {
        newLogSheet: createLogsheet(input: {
            survey_type: $survey_type
            logsheet_date: $logsheet_date
            julian_day: $julian_day
            marker: $marker
            location: $location
            observers: $observers
            siteId: $siteId
            north: $north
            east: $east
            south: $south
            west: $west
            time_start: $time_start
            time_end: $time_end
            azimuth: $azimuth
            failure_time: $failure_time
            receiver_status: $receiver_status
            antenna_status: $antenna_status
            rod_num: $rod_num
            rod_correction: $rod_correction
            avg_slant_height: $avg_slant_height
            ip_add: $ip_add
            netmask: $netmask
            gateway: $gateway
            dns: $dns
            local_tcp_port: $local_tcp_port
            latitude: $latitude
            longitude: $longitude
            observed_situation: $observed_situation
            lodging_road_information: $lodging_road_information
            others: $others
            antennaId: $antennaId
            receiverId: $receiverId
            contactPersonId: $contactPersonId
        }) {
            survey_type
            logsheet_date
            julian_day
            location
            marker
            observers {
                first_name
                last_name
                nickname
            }
            site {
                name
            }
            north
            east
            south
            west
            time_start
            time_end
            azimuth
            failure_time
            receiver_status
            antenna_status
            avg_slant_height
            observed_situation
            lodging_road_information
            others
            antenna {
                serial_number
                type
                part_number
            }
            receiver {
                serial_number
                type
                part_number
            }
            contact {
                first_name
                last_name
            }
        }
    }
`

const updateLogSheet = gql`
    mutation updateLogsheet(
        $id: Int!
        $survey_type: String!
        $logsheet_date: Date!
        $julian_day: Int
        $location: String!
        $marker: String
        $observers: [StaffIdInput]!
        $siteId: Int!
        $north: Float!
        $east: Float!
        $south: Float!
        $west: Float!
        $time_start: String
        $time_end: String
        $azimuth: Int
        $failure_time: String
        $receiver_status: String
        $antenna_status: String
        $rod_num: Int
        $rod_correction: Int
        $avg_slant_height: Float
        $ip_add: String
        $netmask: String
        $gateway: String
        $dns: String
        $local_tcp_port: String
        $latitude: Float
        $longitude: Float
        $observed_situation: String
        $lodging_road_information: String
        $others: String
        $antennaId: String!
        $receiverId: String!
        $contactPersonId: Int
  ) {
        updateLogsheet: updateLogsheet(input: {
            id: $id
            survey_type: $survey_type
            logsheet_date: $logsheet_date
            julian_day: $julian_day
            marker: $marker
            location: $location
            observers: $observers
            siteId: $siteId
            north: $north
            east: $east
            south: $south
            west: $west
            time_start: $time_start
            time_end: $time_end
            azimuth: $azimuth
            failure_time: $failure_time
            receiver_status: $receiver_status
            antenna_status: $antenna_status
            rod_num: $rod_num
            rod_correction: $rod_correction
            avg_slant_height: $avg_slant_height
            ip_add: $ip_add
            netmask: $netmask
            gateway: $gateway
            dns: $dns
            local_tcp_port: $local_tcp_port
            latitude: $latitude
            longitude: $longitude
            observed_situation: $observed_situation
            lodging_road_information: $lodging_road_information
            others: $others
            antennaId: $antennaId
            receiverId: $receiverId
            contactPersonId: $contactPersonId
        }) {
            id
            survey_type
            logsheet_date
            julian_day
            location
            marker
            observers {
                first_name
                last_name
                nickname
            }
            site {
                name
            }
            north
            east
            south
            west
            time_start
            time_end
            azimuth
            failure_time
            receiver_status
            antenna_status
            avg_slant_height
            observed_situation
            lodging_road_information
            others
            antenna {
                serial_number
                type
                part_number
            }
            receiver {
                serial_number
                type
                part_number
            }
            contact {
                first_name
                last_name
            }
        }
    }
`

const checkDuplicate = gql`
    query checkDuplicateLogsheetEntry( $name: String!, $date: Date!)
    {
        possibleDuplicate: checkDuplicateLogsheetEntry(name: $name, date: $date) {
            name
            logsheets {
                id
                logsheet_date
            }
        }
    }
`
const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

const circStyle = {
    margin: 0,
    top: 'auto',
    right: 18.5,
    bottom: 18,
    left: 'auto',
    position: 'fixed',
    zIndex: 9999
}

class LogSheetButtons extends Component {
    constructor(props) {
    super(props);
        this.state = {
            open: false,
            message: '',
            submitSuccess: false,
            progressValue: 1
        };
    }

    toggleSnackbar(open, message) {
        this.setState({open, message})
    } 

    handleRequestClose = () => {
        this.setState({
        open: false,
        });
    };

    handleReset() {
        this.props.dispatch(reset('logsheet'));
        this.props.resetContactId()
        this.props.resetSelectedStaffs()

        setTimeout(function() { this.setState({submitSuccess: false}); }.bind(this), 5000);

    }

    handleUpdateLog(d) {

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
            console.log('got data', data);
            this.setState({ submitSuccess: 'true' })
            this.props.toggleLogsheetSubmitting()
            this.toggleSnackbar(!this.props.logsheetSubmitting, 'logsheet information successfully updated')
            this.handleReset()
        }).catch((err) => {
            console.log('there was an error sending the query: ', err);
            this.props.toggleLogsheetSubmitting()
            this.toggleSnackbar(true, 'logsheet information update failed, try again')
        })
    }

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