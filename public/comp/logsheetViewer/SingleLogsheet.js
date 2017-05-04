import React, { Component } from 'react';
import Details from './Details'

// ui
import { IconButton, Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator } from 'material-ui'
import Back from 'material-ui/svg-icons/navigation/chevron-left';

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const styles = {
  smallIcon: {
    width: 36,
    height: 36,
    color: 'white'
  },
  small: {
    width: 72,
    height: 72,
    padding: 16,
  },
};

const SingleLogsheetQuery = gql` query SingleLogsheet($currentLogsheet: ID) {
    singleLogsheet(id: $currentLogsheet) {
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
        height
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
        team {
        name
        description
        fieldwork {
            name
            description
            start_date
            end_date
        }
        }
    }
  } `;

class SingleLogsheet extends Component {
    render() {
        
        let { loading, singleLogsheet } = this.props.data

        return (
            <div>
                <Toolbar noGutter>
                    <ToolbarGroup>
                        <IconButton
                            iconStyle={styles.smallIcon}
                            style={styles.small}
                            onTouchTap={() => this.props.handleChange(0, null) } >
                                <Back />
                        </IconButton>
                        <ToolbarTitle text="Logsheet Details" />
                    </ToolbarGroup>
                </Toolbar>

                <Details data={singleLogsheet} loading={loading}/>

            </div>
        );
    }
}

export default graphql(SingleLogsheetQuery, {
  options: ({ currentLogsheet }) => ({ variables: { currentLogsheet } }),
})(SingleLogsheet);