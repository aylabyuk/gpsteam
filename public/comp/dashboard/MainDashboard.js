import React, { PureComponent } from 'react';
import { AutoSizer } from 'react-virtualized'

import Phmap from '../map/Phmap'
import RightPanel from './RightPanel'
import SearchDrawer from './SearchDrawer'

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

const SiteDetailsQuery = gql`query SiteDetailsQuery {
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

class MainDashboard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            hoveredSite: '',
            resultDrawer: false,
            searchSite: '',
            detailsDrawer: false
        };
        this.updateDimensions = this.updateDimensions.bind(this);
        this.changeHoveredSite = this.changeHoveredSite.bind(this);
        this.handleViewDetails = this.handleViewDetails.bind(this);
    }

    updateDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    changeHoveredSite(sitename) {
        let hoveredSite = this.props.data.allSite.filter((site) => {
            return site.name === sitename
        })
        let leafletmap = window.leafletmap

        let icon = new L.icon({})

        let previewMarker = new L.marker({ lat: hoveredSite[0].lat, lng: hoveredSite[0].long }, { opacity: 0.5,  })

        previewMarker.addTo(leafletmap.leafletElement)

        window.previewMarker = previewMarker
    }

    searchForSite(val) {
        if(val) {
            this.setState({ resultDrawer: true, searchSite: val })
        } else {
            this.setState({ resultDrawer: false, searchSite: '' })
        }
    }

    handleViewDetails() {
        if(this.state.detailsDrawer == false) {
            this.setState({ detailsDrawer: true })
        }
    }

    render() {

        let { loading, allSite, timeseriesJpgFiles } = this.props.data

        let sites = []

        loading ? null : allSite.map((s) => {
            s.lat && timeseriesJpgFiles.filter((f) => { return f.name === s.name }).length > 0 ? sites.push({ id: s.name, tooltip: s.name, lat: s.lat, lng: s.long }) : null
        })
        
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

                </Drawer>

            </div>
        );
    }
}

export default graphql(SiteDetailsQuery)(MainDashboard);