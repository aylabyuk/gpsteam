import React, {Component} from 'react';
import TimeSeriesContainer from './timeseries/TimeSeriesContainer'
import { connect } from 'react-redux'
import { Link } from 'react-router'

//test datas
import { BUCA } from './m/BUCA'
import { ANGT } from './m/ANGT'

//ui
import { Button } from 'semantic-ui-react'
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';

class TestDashboard extends Component {
    state = { 
        open: false,
        data: BUCA
    }

    toggleDrawer = () => this.setState({ open: !this.state.open })

    changeData = (e) => { 
        switch (e.target.value) {
            case 'BUCA': this.setState({data: BUCA}); break;
            case 'ANGT': this.setState({data: ANGT}); break;
        }
    }

    render() {
        return (
            <div>
                <FlatButton onClick={this.toggleDrawer}>Toggle Visibility</FlatButton>
                <Button onClick={this.changeData} value='BUCA'>BUCA</Button>
                <Button onClick={this.changeData} value='ANGT'>ANGT</Button>
                <Link to='/logsheet'>Log Sheet</Link>
                <Drawer 
                    width={640} 
                    openSecondary={true} 
                    open={this.state.open} 
                    style={{ backgroundColor: "slategray"}}>
                    <TimeSeriesContainer data={this.state.data}/>
                </Drawer>
            </div>
        );
    }
}

export default TestDashboard;