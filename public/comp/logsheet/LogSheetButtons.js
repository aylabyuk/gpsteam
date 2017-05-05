import React, { Component } from 'react';
import { Paper, AppBar, Divider } from 'material-ui';
import { connect } from 'react-redux'
import { reset, reduxForm } from 'redux-form';
import { resetSelectedStaffs, resetContactId } from '../../actions/index';

import { RaisedButton } from 'material-ui';

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
        $marker: String
        $observers: [StaffIdInput]
        $siteNameId: Int!
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
        $teamId: Int
  ) {
        newLogSheet: createLogsheet(input: {
            survey_type: $survey_type
            logsheet_date: $logsheet_date
            julian_day: $julian_day
            marker: $marker
            observers: $observers
            siteNameId: $siteNameId
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
            teamId: $teamId
        }) {
            id
            survey_type
            logsheet_date
            julian_day
            marker
            observers {
            id
            first_name
            last_name
            nickname
            position {
                id
                position_name
            }
            division {
                id
                division_name
            }
            contact_numbers {
                id
                number
            }
            emails {
                id
                address
            }
            office_location
            birthday
            }
            site {
            id
            site_name
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
            rod_num
            rod_correction
            avg_slant_height
            ip_add
            netmask
            gateway
            dns
            local_tcp_port
            latitude
            longitude
            observed_situation
            lodging_road_information
            others
            antenna {
            id
            serial_number
            type
            part_number
            }
            receiver {
            id
            serial_number
            type
            part_number
            }
            contact {
                id
                first_name
                last_name
                position
                contact_number
                organization
                email_add
                address_one
                address_two
                city
                province
            }
        }
    }
`

class LogSheetButtons extends Component {

    handleReset() {
        this.props.dispatch(reset('logsheet'));
        this.props.resetContactId()
        this.props.resetSelectedStaffs()
    }

    handleSubmitLog(d) {

        let observers = [], selectedSite

        this.props.selectedStaffs.map((x)=> {
            observers.push({ id: x.id })
        })

        selectedSite = this.props.siteNames.find((site)=> {
            return site.site_name == d.sitename
        })

        this.props.mutate({ variables: {
            survey_type: 'CAMPAIGN',
            logsheet_date: d.logdate,
            julian_day: d.logdate.julianDate(),
            marker: d.marker,
            observers: observers,
            siteNameId: selectedSite.id,
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
            avg_slant_height: d.aveSlantHeight,
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
            contactPersonId: this.props.selectedContact,
            teamId: null
        } }).then((data) => {
            console.log('got data', data);
            this.handleReset()
        }).catch((error) => {
            console.log('there was an error sending the query: ', error);
        });
    }

    render() {
        return (
             <div style={{ display: 'flex', justifyContent: ' space-around ' }}>
                <RaisedButton label='submit' onTouchTap={this.props.handleSubmit(this.handleSubmitLog.bind(this))} 
                    primary buttonStyle={{ width: 150 }}/>
                <RaisedButton label='cancel' primary buttonStyle={{ width: 150 }}/>
            </div>
        );
    }
}

function mapStateToProps(state) {  
	return {
		selectedStaffs: state.ui.selectedStaffs,
        selectedContact: state.ui.selectedContactId
	}
}

const form =  reduxForm({  
	form: 'logsheet'    
})

export default connect(mapStateToProps, { resetContactId, resetSelectedStaffs })(graphql(addNewLogSheet)(form(LogSheetButtons)));