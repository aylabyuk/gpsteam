import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import { ListItem, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { List as RVList, AutoSizer } from 'react-virtualized'
import { connect } from 'react-redux'
import * as mapActions from './mapActions'

import SiteCard from './SiteCard'

import Follow from '../follow.svg'
import { setTimeout } from 'timers';

const styles = theme => ({
  root: {
    width: '100%',
    height: 'calc(100% - 64px)'
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  follow: {
    top: 0,
    right: 0,
    position: 'absolute',
    width: '50px',
    height: '50px',
    marginRight:  '40px',
    marginTop: '5px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color:  '#FFF',
    zIndex: 5
  },
  followIcon: {
    transform: 'scaleY(-1)',
    filter: 'FlipV'
  },
});

class SitesList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentLetter: 'A',
      currentRows: []
    };
    this._getRowHeight = this._getRowHeight.bind(this);
  }

  _onRowsRendered({ startIndex, stopIndex }) {
    let letter = this.props.sites[startIndex].name.charAt(0)
    this.setState({ currentLetter: letter })


    this.setState({ currentRows: [ startIndex, stopIndex ] })

  }

  _noRowsRenderer = () => {
    return <div ></div>;
  }

  _onscroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    let b = scrollHeight - clientHeight
    let c = scrollTop / b
    let current =  c * clientHeight

    this.follow.style.setProperty('top', current+'px')

    if(current <= 90) {
      this.followIcon.style.setProperty('transform', 'scaleY(-1)')
      this.followIcon.style.setProperty('filter', 'FlipV')
      // this.followIcon.style.setProperty('transition', '.1s ease-in-out')
    } else {
      this.followIcon.style.setProperty('transform', 'scaleY(1)')
      this.follow.style.setProperty('top', current-90+'px')
      // this.followIcon.style.setProperty('transition', '.1s ease-in-out')
    }
  }

  _rowRenderer = ({index, isScrolling, key, style }) => {
      const { sites, selectedSite, classes } = this.props
      let site = sites[index]

      let el = document.getElementById('followParent').classList
      if(isScrolling) {
        el.remove('hidden')
        el.add('visible')
      } else {

        setTimeout(() => {
          el.remove('visible')
          el.add('hidden')
        }, 1000)

      }

      let isSelected = selectedSite === site.name ? true : false

      return(
        <div key={key} style={{...style, backgroundColor: isSelected ? '#FFF' : '#ecf0f1' }}>
          <ListItem button={!isSelected} 
            onClick={() => this.handleClick(site.name)} style={{display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'baseline'}}>
            <ListItemText primary={<strong style={{color: site.surveyType.type === 'campaign' ? '#1e9cd8' : '#bf539e'}}>
              {site.name}</strong>} secondary={
                site.surveyType ?
                  <span>
                    {site.location}
                  </span>
                : <span>unknown</span>
              }
            />
            {isSelected && <Button color='accent' style={{ alignSelf: 'flex-end', marginBottom: '15px' }}>view details</Button>}
          </ListItem>
        </div>
      )
  }

  handleClick = (name) => {
    this.props.setSelectedSite(name)
    this.rvList.recomputeRowHeights()
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedSite, sites } = this.props
    const { currentRows } = this.state
    
    // focus site's row on list
    if(prevProps.selectedSite !== selectedSite) {
      let siteIndex = sites.findIndex(s => {
        return s.name === selectedSite
      })

      if(!(siteIndex > currentRows[0] && siteIndex < currentRows[1])) {
        this.rvList.scrollToRow(siteIndex)
      }
    }
  }

  _getRowHeight({index}) {
    let { selectedSite, sites } = this.props

    if(sites[index].name === selectedSite) {
      return 200
    } else {
      return 75
    }

  }

  render() {
    const { classes, sites } = this.props;
    const { currentLetter } = this.state;

    return (
      <div className={classes.root}>
        <AutoSizer>
            {({width, height}) => (
              <div>
                <div id='followParent'>
                  <div id='follow' ref={(f) => { this.follow = f }} className={classes.follow}>
                    <img alt={currentLetter} ref={(f) => { this.followIcon = f }} width={80} height={80} src={Follow} />
                    <Avatar style={{top: -75, left: 10 ,width: 60, height: 60, backgroundColor: '#3a4aa6', fontSize: 50}}>
                      {currentLetter}
                    </Avatar>
                  </div>
                </div>
                <RVList
                  id='siteList'
                  ref={(s) => {this.rvList = s 
                    window.rvList = s }}
                  height={height}
                  width={width}
                  noRowsRenderer={this._noRowsRenderer}
                  rowCount={sites.length}
                  rowHeight={this._getRowHeight}
                  rowRenderer={this._rowRenderer}
                  onRowsRendered={this._onRowsRendered.bind(this)}
                  onScroll={this._onscroll.bind(this)}
                  scrollToAlignment='center'
                />
              </div>
            )}
        </AutoSizer>
      </div>
    );
  }
}

SitesList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {...state.map}
}

SitesList = connect(mapStateToProps, mapActions)(SitesList)

export default withStyles(styles)(SitesList);