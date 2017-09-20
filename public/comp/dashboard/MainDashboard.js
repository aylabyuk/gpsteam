import React, { PureComponent } from 'react';
import { AutoSizer } from 'react-virtualized'
import { Redirect } from 'react-router-dom'

import Phmap from '../map/Phmap'
import RightPanel from './RightPanel'
import SearchDrawer from './SearchDrawer'
import SiteDetailsDrawer from './SiteDetailsDrawer'

// ui
import { AppBar, Paper, List, ListItem, Drawer} from 'material-ui'
import { Motion, spring } from 'react-motion'
import SearchBar from 'material-ui-search-bar'

// leaflet map
import L from 'leaflet'

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

// server
import { ip, PORT } from '../../_primary'

// styling for the layout of the main dashboard
const styles = {
  center: {
    padding: 0,
    flex: '3 0 0'
  },
  left: {
    padding: 5,
    flex: '.5 0 0',
  },
  right: {
    padding: 0,
    flex: '.5 0 0',
  }
};

// using the SiteDetails query object we can get all the needed site information and timeseries files
const SiteDetailsQuery = gql`query SiteDetailsQuery {
    me { id username email isAdmin isStaff }
    allSite
    {
        name
        long
        lat
    }
    timeseriesJpgFiles {
        name
    }
}`;

// The MainDashboard component will act as container for the map component and the sitelist component for this application
class MainDashboard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            hoveredSite: '',
            resultDrawer: false,
            searchSite: '',
            detailsDrawer: false,
            siteToViewDetails: ''
        };
        this.updateDimensions = this.updateDimensions.bind(this);
        this.handleViewDetails = this.handleViewDetails.bind(this);
        this.handleCloseDetails = this.handleCloseDetails.bind(this);
    }

    // setting the width and the height of the component depending on the dimension of the browser
    updateDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    // update the component width and height before mounting
    componentWillMount() {
        this.updateDimensions();
    }

    // add an event listener to the component when user resizes the browser window
    // attach updateDimension to the resize event
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    
    // remove the listener
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    // use this method for setting the searchSite value
    // when val is not null or undefined open the resultDrawer 
    searchForSite(val) {
        if(val) {
            this.setState({ resultDrawer: true, searchSite: val })
        } else {
            this.setState({ resultDrawer: false, searchSite: '' })
        }
    }

    // setting the state of the detailsDrawer to true
    // setting the selected sitename as the siteToViewDetails state
    handleViewDetails(sitename) {
        if(this.state.detailsDrawer == false) {
            this.setState({ detailsDrawer: true })
        }

        this.setState({siteToViewDetails: sitename})
    }

    // this method is called to reset the drawer states 
    handleCloseDetails() {
        this.setState({ detailsDrawer: false })
        this.setState({siteToViewDetails: ''})
    }

    render() {
        // get all nessesary props from the data object
        // these are available from the return values of the graphql request
        let { loading, allSite, timeseriesJpgFiles } = this.props.data

        // create the sites array and push all site objects that has a latitude value and a timeseries jpg file 
        // store the id name and coordinates of the sites to the sites array
        let sites = []
        loading ? null : allSite.map((s) => {
            s.lat && timeseriesJpgFiles.filter((f) => { return f.name === s.name }).length > 0 ? sites.push({ id: s.name, tooltip: s.name, lat: s.lat, lng: s.long }) : null
        })
        
        // the maindashboard component contains 2 drawers ( SearchDrawer and SiteDetailsDrawer ) and the map (Phmap-Philippine Map) component as its children
        // using Autosizer we can identify of compute for the available width and height
        return (
            <div id='cont' style={{width: this.state.width, height: this.state.height}}>
                <AppBar title="GPS Dashboard" iconElementRight={<SearchBar hintText='Search Sites' onChange={(val)=> this.searchForSite(val)} onRequestSearch={(val)=> console.log('test')}/>}/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', height: this.state.height - 64 }}>
                    <Paper style={styles.center}>
                        <AutoSizer>
                            {({width, height}) => (
                                <Phmap width={width} height={height} markers={sites} loading={loading} handleViewDetails={this.handleViewDetails}/>
                            )}
                        </AutoSizer>
                    </Paper>
                </div>

                <Drawer width={280} containerStyle={{ top: '64px' }} openSecondary open={this.state.resultDrawer} >
                    <SearchDrawer sites={sites} filter={this.state.searchSite}/>
                </Drawer>

                <Drawer openSecondary width={280} open={this.state.detailsDrawer}>
                    <SiteDetailsDrawer close={this.handleCloseDetails} site={this.state.siteToViewDetails}/>
                </Drawer>

            </div>
        );
    }
}

// using the graphql higher order component with the SiteDetailsQuery variable we can get all the needed site information from the server
// it will attach the data to the MainDashboard component as props
export default graphql(SiteDetailsQuery)(MainDashboard);