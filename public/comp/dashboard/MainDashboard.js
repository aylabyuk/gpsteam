import React, { PureComponent } from 'react';
import { AutoSizer } from 'react-virtualized'

import Phmap from '../map/Phmap'
import RightPanel from './RightPanel'

// ui
import { AppBar, Paper, List, ListItem, Drawer} from 'material-ui'
import { Motion, spring } from 'react-motion'
import SearchBar from 'material-ui-search-bar'

// leaflet map
import L from 'leaflet'

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

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
}`;

class MainDashboard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            hoveredSite: ''
        };
        this.updateDimensions = this.updateDimensions.bind(this);
        this.changeHoveredSite = this.changeHoveredSite.bind(this);
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

    render() {

        let { loading, allSite } = this.props.data

        let sites = []

        loading ? null : allSite.map((s) => {
            s.lat ?
            sites.push({ id: s.name, tooltip: s.name, lat: s.lat, lng: s.long }) : null
        })
        
        return (
            <div id='cont' style={{width: this.state.width, height: this.state.height}}>
                <AppBar title="GPS Dashboard" iconClassNameRight="muidocs-icon-navigation-expand-more" 
                    iconElementRight={<SearchBar hintText='Search Sites'/>}/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', height: this.state.height - 64 }}>
                    <Paper style={styles.center}>
                        <AutoSizer>
                            {({width, height}) => (
                                <Phmap width={width} height={height} markers={sites} loading={loading}/>
                            )}
                        </AutoSizer>
                    </Paper>

                </div>

                <Drawer openSecondary open={false} >
                    
                </Drawer>

            </div>
        );
    }
}

export default graphql(SiteDetailsQuery)(MainDashboard);