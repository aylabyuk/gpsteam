// import nessesary packages
import React, { PureComponent, PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom'

// import all logsheet components
import DateFields from './DateFields'
import ObserversFields from './ObserversFields'
import SiteFields from './SiteFields'
import HardwareFields from './HardwareFields'
import MeasurementFields from './MeasurementFields'
import TimeFields from './TimeFields'
import StatusFields from './StatusFields'
import AntennaHeigtInfoFields from './AntennaHeightInfoFields'
import PertinentInfoFields from './PertinentInfoFields'
import SiteContactPersonFields from './SiteContactPersonFields'
import LogSheetButtons from './LogSheetButtons'

// import methods to be use for the component state management
import { changeSelectedStaffs, changeSelectedContact, resetContactId, resetSelectedStaffs, toggleLogsheetSubmitting, reviewLogsheet } from '../../actions/index'

// import form validation module 
import { validateLogsheet as validate } from '../formValidators/formValidators'

// import ui components to use in the component
import { Paper, Divider, LinearProgress, CircularProgress } from 'material-ui';
import styles from '../../css/home.css';


// create a graphql query taht will get all the sites, receivers and antenna information 
const LogSheetQuery = gql`query LogSheetQuery {
  allSite {
    id
    name
  }
  allReceiver {
    serial_number
  }
  allAntenna {
    serial_number
  }
}`;

// this component will hold all the form related sub components such as textfields and datepickers for logsheets.. 
// set this component as Purecomponent since we only want to render this when state and props changes.
class LogSheetForm extends PureComponent {

    // this function will run each time the component updates because of changes to the props.toReview
    reinitializeForm(data) {
        let  { initialize, changeSelectedStaffs, changeSelectedContact } = this.props

        // loop through all observer data and provide a new variable array to store all observer information 
        let observerIds = []
        data.observers.map((o)=> {
            observerIds.push({ 
                id: o.id,
                nname: o.nickname,
                initials: o.first_name.charAt(0) + o.last_name.charAt(0)
            })
        })

        initialize(data)
        changeSelectedStaffs(observerIds)
        
        // if a contact data is present take action by calling a custom redux action changeSelectedContact 
        // if not, then provide a null  value for the selected contact 
        if(data.contact) {
            changeSelectedContact({
                id: data.contact.id,
                first_name: data.contact.first_name,
                last_name: data.contact.last_name,
                contact_number: data.contact.contact_number,
            })
        } else {
            changeSelectedContact(null)
        }
    }
    
    // if there is a change in the components props the reinitializeForm will be called to supply the component correct data when rendered
    componentWillUpdate(nextProps, nextState) {
        if(nextProps.toReview != null) {
            if(this.props.toReview == null) {
                this.reinitializeForm(nextProps.toReview)
            } else if(this.props.toReview.id != nextProps.toReview.id) {
                this.reinitializeForm(nextProps.toReview)
            }
        }

        // reset global redux stores if logsheet component is in 'new' mode
        if(nextProps.logsheetMode != this.props.logsheetMode ) {
            if(nextProps.logsheetMode == 'new') {
                this.props.resetContactId()
                this.props.reviewLogsheet(null)
                this.props.resetSelectedStaffs()
                this.props.initialize(null)
                
                // provide a 5 seconds delay when changing the state of the component. This will greatly affect the behavior of the logsheet button
                // since in 'read only' mode the button will be hidden and in 'new' mode the button will be visible.
                setTimeout(function() { this.setState({submitSuccess: false}); }.bind(this), 5000);
            }
        }
    }
    

    render() {
        let { loading, allSite, allReceiver, allAntenna } = this.props.data

        // if apollo client is still querying data to the server, render a linear progress component.
        if(loading) {
            return (
                <div>
                    <CircularProgress mode="indeterminate" />
                </div>
            );
        } else {
            // ro means 'readonly' can be true or false
            // this application ui state will be passed as props to the component to manage the behavior of every single fields depending on its value
            // in readonly all the fields will be disabled
            let ro = this.props.logsheetMode == 'readonly' ? true : false

            // if all the data has been successfully requested by the apollo client
            // render every single component. Each of these component is equivalent to a field.
            return (
                <div>
                    <DateFields ro={ro} />
                    <ObserversFields ro={ro}/>
                    {/* Provide all sitenames to the SieFields component  */}
                    <SiteFields ro={ro} siteNames={allSite ? allSite : [{name: 'loading..'}]}/>
                    <HardwareFields ro={ro} receivers={allReceiver ? allReceiver : [{serial_number: 'loading..'}]} 
                            antennas={allAntenna ? allAntenna : [{serial_number: 'loading..'}]} />
                    <MeasurementFields ro={ro}/>
                    <TimeFields ro={ro}/>
                    <StatusFields ro={ro}/>
                    <AntennaHeigtInfoFields ro={ro}/>
                    <PertinentInfoFields ro={ro}/>
                    {/* provide the selectedContact as props and way to change it by passing the function change as a custom attribute to SiteContactPersonFields */}
                    <SiteContactPersonFields ro={ro} selectedContact={this.props.selectedContact} change={this.props.change}/>
                    <Divider />
                    <br />
                    {/* pass the function handleSubmit as props to the LogSheetButtons component */}
                    { !this.props.noSendButton ? <LogSheetButtons ro={ro} siteNames={allSite} selectedContact={this.props.selectedContact} handleSubmit={this.props.handleSubmit}/> : null }
                </div>
            );
        }
    }
}


// this is the standard way of creating a Higher Order Component/Form in redux-form
// name the form 'logsheet'
// pass the validate variable which contains validation rules for logsheet component
const form =  reduxForm({  
	form: 'logsheet',
    validate
})

// map the ui state logsheetToReview object to a toReview variable before passing it as a props
function mapStateToProps(state) {  

    let { logsheetToReview } = state.ui
    let l = logsheetToReview

    // if logsheetToReview has data create a new variable toReview
    // else provide a null value
    const toReview = state.ui.logsheetToReview ? {
        id: l.id,
        logdate: new Date(l.logsheet_date),
        sitename: l.site.name,
        marker: l.marker,
        location: l.location,
        receiverSN: l.receiver.serial_number,
        antennaSN: l.antenna.serial_number,
        north: l.north,
        east: l.east,
        south: l.south,
        west: l.west,
        azimuth: l.azimuth,
        startTime: l.time_start,
        endTime: l.time_end,
        failureTime: l.failure_time,
        receiverStatus: l.receiver_status,
        antennaStatus: l.antenna_status,
        rodNo: l.rod_num,
        rodCorrection: l.rod_correction,
        ipAddress: l.ip_add,
        netmask: l.netmask,
        gateway: l.gateway,
        dns: l.dns,
        localTcpPort: l.local_tcp_port,
        lat: l.latitude,
        long: l.longitude,
        unusualAbnormalObservation: l.observed_situation,
        lodgingOrRoadInfo: l.lodging_road_information,
        pertinentInfo: l.others,
        observers: l.observers,
        contact: l.contact
    } : null

    // return all these ui states
	return {
		selectedContact: state.ui.selectedContact,
        logsheetMode: state.ui.logsheetMode,
        toReview: toReview
	}
}

// export the LogsheetForm component together with the redux actions, ui states and LogsheetQuery
// connect is a HOC by redux and graphql is a 
export default connect(mapStateToProps, {changeSelectedStaffs, changeSelectedContact, resetContactId, resetSelectedStaffs, reviewLogsheet })
                (graphql(LogSheetQuery)(form(LogSheetForm)))
