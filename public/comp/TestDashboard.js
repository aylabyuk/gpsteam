import React, {Component} from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import TimeSeriesContainer from './TimeSeriesContainer'

//test datas
import { BUCA } from './m/BUCA'
import { ANGT } from './m/ANGT'

class TestDashboard extends Component {
    state = { 
        visible: false,
        data: BUCA
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    changeData = (e) => { 
        switch (e.target.value) {
            case 'BUCA': this.setState({data: BUCA}); break;
            case 'ANGT': this.setState({data: ANGT}); break;
        }
    }

    

    render() {
        return (
            <div>
                <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
                <Button onClick={this.changeData} value='BUCA'>BUCA</Button>
                <Button onClick={this.changeData} value='ANGT'>ANGT</Button>
               
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
                    <TimeSeriesContainer data={this.state.data}/>
                </Sidebar>
                
            </div>
        );
    }
}

export default TestDashboard;