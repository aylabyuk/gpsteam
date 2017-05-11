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
        location
        marker
        observers {
            first_name
            last_name
            nickname
        }
        site {
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