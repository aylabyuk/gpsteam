import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { client } from '../index'
import gql from 'graphql-tag';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class SitesList extends React.Component {
  state = {
    expanded: null,
    sites: client.readQuery({
        query: gql`
            {
                sites {
                    id
                    name
                    description
                    location
                    longitude
                    latitude
                    surveyType {
                        type
                    }
                }
            }
        `
        })
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded, sites } = this.state;

    return (
      <div className={classes.root}>
        {
            sites.sites.map((s) => {
                return(
                    <ExpansionPanel key={s.id} expanded={expanded === 'panel'+s.id} onChange={this.handleChange('panel'+s.id)}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>{s.name}</Typography>
                            <Typography className={classes.secondaryHeading}>{s.surveyType ? s.surveyType.type : 'unknown'}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                            {s.description ? s.description : 'no description'}
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )
            })
        }

      </div>
    );
  }
}

SitesList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SitesList);