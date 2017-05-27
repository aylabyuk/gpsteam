import React, { Component } from 'react';

import Phmap from '../map/Phmap'
import * as d3 from 'd3'
import ContainerDimensions from 'react-container-dimensions'

import { AppBar, Paper} from 'material-ui'

const styles = {
  center: {
    height: window.innerHeight,
    padding: 5,
    flex: '3 0 0'
  },
  left: {
    padding: 5,
    flex: '.5 0 0',
    height: window.innerHeight
  },
  right: {
    padding: 5,
    flex: '1 0 0',
    height: window.innerHeight
  }
};

class MainDashboard extends Component {
    render() {
        
        return (
        <ContainerDimensions> 
            {
                ({ width, height }) => 
                    <div>
                        <AppBar title="GPS Dashboard" iconClassNameRight="muidocs-icon-navigation-expand-more" />
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                            <Paper style={styles.left}>
                                
                            </Paper>
                            <Paper style={styles.center}>
                                <ContainerDimensions > 
                                {
                                   ({ width, height }) =>  <Phmap width={width} height={height}/>
                                }
                                </ContainerDimensions >
                            </Paper>
                            <Paper style={styles.right}>
                                
                            </Paper>
                        </div>
                    </div>
                
            }

        </ContainerDimensions>
        );
    }
}

export default MainDashboard;