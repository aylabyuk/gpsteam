import React, { Component } from 'react';

import Phmap from '../map/Phmap'

import { AppBar, Paper} from 'material-ui'

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

class MainDashboard extends Component {
    render() {
        return (
            <div>
                <AppBar title="GPS Dashboard" iconClassNameRight="muidocs-icon-navigation-expand-more" />
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Paper style={styles.left}>
                        
                    </Paper>
                    <Paper style={styles.center}>
                        <Phmap />
                    </Paper>
                    <Paper style={styles.right}>
                        
                    </Paper>
                </div>
            </div>
        );
    }
}

export default MainDashboard;