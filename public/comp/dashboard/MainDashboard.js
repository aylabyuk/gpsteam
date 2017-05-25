import React, { Component } from 'react';

import Phmap from '../map/Phmap'

import { AppBar, Paper} from 'material-ui'

const styles = {
  center: {
    width: '100%',
    height: '100vh',
    padding: 5
  },
  panel: {
      width: '300px',
      padding: 5,
      height: '100vh',
  }
};

class MainDashboard extends Component {
    render() {
        return (
        <Paper>
            <AppBar title="GPS Dashboard" iconClassNameRight="muidocs-icon-navigation-expand-more" />
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Paper style={styles.panel}>
                    
                </Paper>
                <Paper style={styles.center}>
                    <Phmap />
                </Paper>
            </div>
        </Paper>
        );
    }
}

export default MainDashboard;