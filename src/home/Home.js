import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import { Typography } from 'material-ui'
import { Redirect } from 'react-router-dom'

import { compose } from 'react-apollo'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const styles = {
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    },
    progress: {
        maxWidth: '50%',
        width: '50vh'
    },
};

class Home extends React.Component {
    render() {
        const { classes, sites } = this.props

        if(sites.loading) {
            return (
                <div className={classes.root}>
                    <div className={classes.progress}>
                        <LinearProgress color='accent' />
                        <br />
                        <Typography color='accent'>Downloading GPS Site Information</Typography>
                    </div>
                </div>
            );
        }

        return (
            <Redirect to='/dash/map' />
        )
    }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const sitesQuery = gql`
    {
        sites {
            id
            name
            description
            location
            longitude
            latitude
        }
      }
`

const withData = compose(
    graphql(sitesQuery, { name: 'sites' }),
)(Home)

export default withStyles(styles)(withData);