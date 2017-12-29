import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import SendIcon from 'material-ui-icons/Send';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import StarBorder from 'material-ui-icons/StarBorder';
import Divider from 'material-ui/Divider'
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class NavList extends React.Component {
  state = { 
        openLogsheets: true,
        openEquipments: true
    };

  toggleLogsheets = () => {
        this.setState({ openLogsheets: !this.state.openLogsheets });
  };

  toggleEquipments = () => {
        this.setState({ openEquipments: !this.state.openEquipments });
  }

  render() {
    const { classes } = this.props;

    return (
      <List className={classes.root} subheader={<ListSubheader>Site Navigation</ListSubheader>}>
        <ListItem button component={Link} to='/dash/map'>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText inset primary="Map" />
        </ListItem>
        <ListItem button component={Link} to='/dash/sites'>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText inset primary="Sites" />
        </ListItem>
        <ListItem button onClick={this.toggleLogsheets} component={Link} to='/dash/logsheets'>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText inset primary="Logsheets" />
          {this.state.openLogsheets ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse component="li" in={this.state.openLogsheets} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItem button className={classes.nested} component={Link} to='/dash/logsheets/campaign'>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary="Campaign" />
            </ListItem>
            <ListItem button className={classes.nested} component={Link} to='/dash/logsheets/continuous'> 
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary="Continuous" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={this.toggleEquipments} component={Link} to='/dash/equipments'>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText inset primary="Equipments" />
          {this.state.openEquipments ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse component="li" in={this.state.openEquipments} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItem button className={classes.nested} component={Link} to='/dash/equipments/antennas'>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary="Antennas" />
            </ListItem>
            <ListItem button className={classes.nested} component={Link} to='/dash/equipments/receivers'>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary="Receivers" />
            </ListItem>
          </List>
        </Collapse>
        <Divider />
        <ListItem button component={Link} to='/dash/users'>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText inset primary="Users" />
        </ListItem>
      </List>
    );
  }
}

NavList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavList);
