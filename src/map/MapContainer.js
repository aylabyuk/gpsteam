import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import { Drawer, IconButton, Hidden } from 'material-ui/';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';

import SearchBox from './SearchBox'
import PhMap from './Map'

const drawerWidth = 240;

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
    flexDirection: 'row',
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
    border: 0
  },
  drawerPaperBottom: {
    position: 'relative',
    height: '50vh',
    width: '100%',
    border: 0
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    backgroundColor: '#bdc3c7',
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
  },
  'content-style': {
    [theme.breakpoints.up('sm')]: {
      marginRight: -drawerWidth-1,
      height: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '-50vh',
      height: `calc(100% - 50vh)`
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-margin': {
    [theme.breakpoints.up('sm')]: {
      marginRight: 0
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
    },
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

  handleDrawerClose = async () => {
    await this.setState({ open: false });

    setTimeout(() => {
      window.map.leafletElement.invalidateSize(true)
    }, 500)

    return true
  };

  drawer
  
  render() {
    const { classes } = this.props;
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
            <SearchBox />
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
            <SearchBox />
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
              [classes[`contentShift-margin`]]: open,
            })}
          >
            <PhMap openDrawer={this.handleDrawerOpen} isDrawerOpen={open}/>
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