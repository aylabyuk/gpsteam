import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import { Drawer, IconButton, Hidden } from 'material-ui/';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';

import PhMap from './Map'

const drawerWidth = 240;
const drawerHeight = 230;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    },
  },
  drawerPaperRight: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
  drawerPaperBottom: {
    backgroundColor: 'green',
    position: 'relative',
    height: drawerHeight,
    width: '100%',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: '100%'
  },
  'content-style': {
    marginRight: -drawerWidth,
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
      marginDown: -drawerHeight
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-bottom': {
    marginBottom: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
});

class Map extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = async () => {
    await this.setState({ open: true });
    return true
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    const drawerRight = (
      <Drawer
        type="persistent"
        classes={{
          paper: classes.drawerPaperRight,
        }}
        anchor='right'
        open={open}
      >
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronRightIcon />
            </IconButton>
          </div>
        </div>
      </Drawer>
    );

    const drawerBottom = (<Drawer
        type="persistent"
        classes={{
          paper: classes.drawerPaperBottom,
        }}
        anchor='bottom'
        open={open}
      >
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronRightIcon />
            </IconButton>
          </div>
        </div>
      </Drawer>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <main
            className={classNames(classes.content, classes[`content-style`], {
              [classes.contentShift]: open,
              [classes[`contentShift-bottom`]]: open,
            })}
          >
            <PhMap openDrawer={this.handleDrawerOpen}/>
          </main>
          <Hidden smDown>{drawerRight}</Hidden>
          <Hidden smUp>{drawerBottom}</Hidden>
        </div>
      </div>
    );
  }
}

Map.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Map);