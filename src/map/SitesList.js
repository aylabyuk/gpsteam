import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { client } from '../index'
import gql from 'graphql-tag';
import Avatar from 'material-ui/Avatar';
import { ListItem, ListItemText } from 'material-ui/List';
import { List as RVList, AutoSizer } from 'react-virtualized'
import { connect } from 'react-redux'
import * as mapActions from './mapActions'

import Follow from '../follow.svg'

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
      currentLetter: 'A',
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
  }

  _onRowsRendered({ startIndex, stopIndex }) {
    let letter = this.state.sites[startIndex].name.charAt(0)
    this.setState({ currentLetter: letter })
    const el = document.getElementById('siteList')
    let a = el.scrollTop
    let b = el.scrollHeight - el.clientHeight
    let c = a / b
    let current =  c * el.clientHeight

    this.follow.style.setProperty('top', current+'px')

    if(current <= 90) {
      this.followIcon.style.setProperty('transform', 'scaleY(-1)')
      this.followIcon.style.setProperty('filter', 'FlipV')
      this.followIcon.style.setProperty('transition', '.1s ease-in-out')
    } else {
      this.followIcon.style.setProperty('transform', 'scaleY(1)')
      this.follow.style.setProperty('top', current-90+'px')
      this.followIcon.style.setProperty('transition', '.1s ease-in-out')
    }
  }

  _noRowsRenderer = () => {
    return <div >No rows</div>;
  }

  componentWillMount() {
    // remove undefined surveytypes and undefined coordinates
    let withSTypes = this.state.sites.sites.filter(s => {
      return s.surveyType && s.latitude && s.longitude
    })

    this.setState({ sites: withSTypes })
  }

  _rowRenderer = ({index, isScrolling, key, style}) => {
      const sites = this.state.sites
      let site = sites[index]

      return(
        <div key={key} style={style}>
          <ListItem button onClick={() => this.handleClick(site.name, site.surveyType.type)}>
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

  handleClick = (name, type) => {
    let { showCampaignSites, showContinuousSites } = this.props
    if(type === 'campaign' && !showCampaignSites) {

    } else if(type === 'continuous' && !showContinuousSites) {

    } else {
      this.props.setSelectedSite(name)
    }
  }

  render() {
    const { classes } = this.props;
    const { sites, currentLetter } = this.state;

    return (
      <div className={classes.root}>
        <AutoSizer>
            {({width, height}) => (
              <div>
                <div id='follow' ref={(f) => { this.follow = f }} className={classes.follow}>
                  <img alt={currentLetter} ref={(f) => { this.followIcon = f }} width={80} height={80} src={Follow} />
                  <Avatar style={{top: -75, left: 10 ,width: 60, height: 60, backgroundColor: '#3a4aa6', fontSize: 50}}>
                    {currentLetter}
                  </Avatar>
                </div>
                <RVList
                  id='siteList'
                  height={height}
                  width={width}
                  noRowsRenderer={this._noRowsRenderer}
                  rowCount={sites.length}
                  rowHeight={70}
                  rowRenderer={this._rowRenderer}
                  onRowsRendered={this._onRowsRendered.bind(this)}
                  // scrollToIndex={scrollToIndex}
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