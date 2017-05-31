import React, { Component } from 'react';
import { AutoSizer } from 'react-virtualized'

import Phmap from '../map/Phmap'

// ui
import { AppBar, Paper, List, ListItem} from 'material-ui'

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const styles = {
  center: {
    padding: 5,
    flex: '3 0 0'
  },
  left: {
    padding: 5,
    flex: '.5 0 0',
  },
  right: {
    padding: 5,
    flex: '1 0 0',
  }
};

const SiteDetailsQuery = gql`query SiteDetailsQuery {
    allSiteDetail {
        name {
            site_name
        }
        location {
            long
            lat
        }
    }
}`;

class MainDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        this.updateDimensions = this.updateDimensions.bind(this);
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

    render() {

        let { loading, allSiteDetail } = this.props.data

        let sites = []

        loading ? null : allSiteDetail.map((s) => {
            s.location.lat ?
            sites.push({ id: s.name.site_name, tooltip: s.name.site_name, lat: s.location.lat, lng: s.location.long }) : null
        })
        
        return (
            <div id='cont' style={{width: this.state.width, height: this.state.height}}>
                <AppBar title="GPS Dashboard" iconClassNameRight="muidocs-icon-navigation-expand-more" />
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', height: this.state.height - 64 }}>
                    <Paper style={styles.left}>
                        
                    </Paper>
                    <Paper style={styles.center}>
                        <AutoSizer>
                            {({width, height}) => (
                                <Phmap width={width} height={height} markers={sites} loading={loading}/>
                            )}
                        </AutoSizer>
                    </Paper>
                    <Paper style={styles.right}>
                        <AutoSizer>
                            {({width, height}) => (
                                <div style={{width, height: height, overflowY: 'scroll'}}>
                                    <List>
                                        {
                                            sites.map((s)=> {
                                                return(
                                                    <ListItem primaryText={s.id} id={s.id} key={s.id} ref={s.id} />
                                                )
                                            })
                                        }
                                    </List>
                                </div>
                            )}
                        </AutoSizer>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default graphql(SiteDetailsQuery)(MainDashboard);