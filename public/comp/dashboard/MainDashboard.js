import React, { Component } from 'react';
import { AutoSizer } from 'react-virtualized'

import Phmap from '../map/Phmap'

// ui
import { AppBar, Paper} from 'material-ui'

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
        
        return (
            <div style={{width: this.state.width, height: this.state.height}}>
                <AppBar title="GPS Dashboard" iconClassNameRight="muidocs-icon-navigation-expand-more" />
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', height: '100%'}}>
                    <Paper style={styles.left}>
                        
                    </Paper>
                    <Paper style={styles.center}>
                        <AutoSizer >
                            {({width, height}) => (
                                <Phmap width={width} height={height - 80} sites={allSiteDetail} loading={loading}/>
                            )}
                        </AutoSizer>
                    </Paper>
                    <Paper style={styles.right}>
                        
                    </Paper>
                </div>
            </div>
        );
    }
}

export default graphql(SiteDetailsQuery)(MainDashboard);