import React, {Component} from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import TimeSeriesContainer from './TimeSeriesContainer'

class TestDashboard extends Component {
    state = { visible: false }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    render() {
        return (
            <div>
                <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
               
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    width='very wide'
                    direction='right'
                    visible={this.state.visible}
                    vertical
                    inverted
                    style={{width: 648,  overflowY: "hidden", overflowX: "hidden"}}
                >
                    <TimeSeriesContainer />
                </Sidebar>
                
            </div>
        );
    }
}

export default TestDashboard;