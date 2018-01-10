import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import { ListItem, ListItemText } from 'material-ui/List';
import { List as RVList, AutoSizer } from 'react-virtualized'
import { connect } from 'react-redux'
import * as mapActions from './mapActions'

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
  }
});

class SitesList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentLetter: 'A'
    };
  }

  _onRowsRendered({ startIndex, stopIndex }) {
    let letter = this.props.sites[startIndex].name.charAt(0)
    this.setState({ currentLetter: letter })
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
      const { sites } = this.props
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

      return(
        <div key={key} style={style}>
          <ListItem button onClick={() => this.handleClick(site.name)}>
            <ListItemText primary={<strong>{site.name}</strong>} secondary={
                site.surveyType ? 
                <strong style={{ color: site.surveyType.type === 'campaign' ? '#1e9cd8' : '#bf539e' }}>
                  {site.surveyType.type}
                </strong>
                : <strong>unknown</strong>
              } 
            />
          </ListItem>
        </div>
      )
  }

  handleClick = (name) => {
    this.props.setSelectedSite(name)
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedSite, sites } = this.props
    const { shouldFocusOnList } = this.state
    if(prevProps.selectedSite !== selectedSite) {
      let siteIndex = sites.findIndex(s => {
        return s.name === selectedSite
      })

      this.rvList.scrollToRow(siteIndex)
    }
}

  render() {
    const { classes, sites } = this.props;
    const { currentLetter, scrollToIndex } = this.state;

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
                  ref={(s) => this.rvList = s}
                  height={height}
                  width={width}
                  noRowsRenderer={this._noRowsRenderer}
                  rowCount={sites.length}
                  rowHeight={70}
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