import React, { Component } from 'react';
import { Paper, AppBar, Divider } from 'material-ui';

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
    mutation addNewLogSheet(
        $fieldwork_id: ID!
        $site_name: String
        $survey_type: String
        $logsheet_date: Date
        $julian_day: Int
        $marker: String
        $receiver_serialnumber: String
        $antenna_serialnumber: String
        $height: Float
        $north: Float
        $east: Float
        $south: Float
        $west: Float
        $time_start: Time
        $time_end: Time
        $azimuth: Int
        $failure_time: Time
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
        $site_sketch_id: ID
        $observed_situation: String
        $lodging_road_information: String
        $contact_id: Int
        $others: String
    ) {
        newLogSheet: createLogSheet(
            fieldwork_id: $fieldwork_id
            site_name: $site_name
            survey_type: $survey_type
            logsheet_date: $logsheet_date
            julian_day: $julian_day
            marker: $marker
            receiver_serialnumber: $receiver_serialnumber
            antenna_serialnumber: $antenna_serialnumber
            height: $height
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
            site_sketch_id: $site_sketch_id
            observed_situation: $observed_situation
            lodging_road_information: $lodging_road_information
            contact_id: $contact_id
            others: $others
        ) {
            id
            logsheet_date
            time_start
            time_end
        }
    }
`

class LogSheetButtons extends Component {

    handleSubmitLog(d) {
        console.log(d)

        this.props.mutate({ variables: {
            fieldwork_id: 0,
            site_name: d.sitename,
            survey_type: 'campaign',
            logsheet_date: d.logdate,
            julian_day: d.logdate.julianDate(),
            marker: d.marker,
            receiver_serialnumber: d.receiverSN,
            antenna_serialnumber: d.antennaSN,
            height: d.height,
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
            // site_sketch_id: $site_sketch_id,
            observed_situation: d.unusualAbnormalObservation,
            lodging_road_information: d.lodgingOrRoadInfo,
            contact_id: this.props.contactId,
            // others: $others,
        } }).then((data) => {
            console.log('got data', data);
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

export default graphql(addNewLogSheet)(LogSheetButtons);