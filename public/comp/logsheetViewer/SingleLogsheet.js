import React, { PureComponent } from 'react';
import Details from './Details'
import moment from 'moment'
import { connect } from 'react-redux'
import { toggleLogsheetViewerDrawer, reviewLogsheetMode } from '../../actions/index'

// ui
import { AppBar, IconButton, Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator, IconMenu, MenuItem } from 'material-ui'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import Back from 'material-ui/svg-icons/navigation/arrow-back';
import NavigationClose  from 'material-ui/svg-icons/navigation/close';

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const SingleLogsheetQuery = gql` query SingleLogsheet($currentLogsheet: ID) {
    singleLogsheet(id: $currentLogsheet) {
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
        rod_num
        rod_correction
        ip_add
        netmask
        gateway
        dns
        local_tcp_port
        latitude
        longitude
        contact {
            first_name
            last_name
            email_add
            contact_number
        }
    }
  } `;

class SingleLogsheet extends PureComponent {
    render() {
        
        let { loading, singleLogsheet } = this.props.data
        let title = ''

        if(singleLogsheet) {
            let logdate = new Date(singleLogsheet.logsheet_date)
            title = singleLogsheet.site.name + ' - ' + moment(logdate).format('MM/DD/YYYY - dddd')
        }

        return (
            <div style={{ overflowY: 'hidden' }}>
                <AppBar titleStyle={{ fontSize: '20px' }} title={title} iconElementLeft={ <IconButton
                            onTouchTap={() => this.props.handleChange(1, null) } >
                                <Back />
                        </IconButton> } 
                        iconElementRight={ <IconButton onTouchTap={()=> this.props.toggleLogsheetViewerDrawer()}><NavigationClose /></IconButton> }/>
                    <Details reviewLogsheet={this.props.reviewLogsheetMode} toggleDrawer={this.props.toggleLogsheetViewerDrawer} data={singleLogsheet} loading={loading}/>
            </div>
        );
    }
}

export default connect( null, { toggleLogsheetViewerDrawer, reviewLogsheetMode })(graphql(SingleLogsheetQuery, {
  options: ({ currentLogsheet }) => ({ variables: { currentLogsheet } }),
})(SingleLogsheet));