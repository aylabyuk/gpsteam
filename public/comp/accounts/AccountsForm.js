import React, { Component } from 'react';
import { Paper, Tab, Tabs } from 'material-ui'
import SwipeableViews from 'react-swipeable-views'

import Login from './Login'
import SignUp from './SignUp'

import styles from '../../css/bg.css'

class AccountsForm extends Component {
    constructor(props) {
    super(props);
        this.state = {
            slideIndex: 0,
        };
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    render() {
        return (
            <Paper className='mybg'  style={{ padding: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <Paper>
                    Header
                </Paper>
                <Paper zDepth={3} style={{ width: '500px' }}>
                    {/* <Tabs onChange={this.handleChange} value={this.state.slideIndex} >
                        <Tab label="Login" value={0} />
                        <Tab label="SignUp" value={1} />
                    </Tabs> */}
                    <SwipeableViews disabled  index={this.state.slideIndex} onChangeIndex={this.handleChange}>
                        <Login handleChange={this.handleChange}/>
                        <SignUp handleChange={this.handleChange}/>
                    </SwipeableViews>
                </Paper>
            </Paper>
        );
      }
}

export default AccountsForm;