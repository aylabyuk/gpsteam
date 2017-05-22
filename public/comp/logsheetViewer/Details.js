import React, { Component } from 'react';
import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Tab3 from './Tab3'

// ui 
import { Tab, Tabs, CircularProgress } from 'material-ui'
import SwipeableViews from 'react-swipeable-views'


class Details extends Component {
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
        let { data, loading } = this.props

        if(loading || !data) {
            return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '600px' }}>
                    <CircularProgress 
                        style={{ maxWidth: '50%' }}
                        size={60}
                        thickness={5}
                    />
                </div>
            );
        } else {
            return (
                <div>
                <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
                    <Tab label="details" value={0} />
                    <Tab label="measurements" value={1} />
                    <Tab label="others" value={2} />
                </Tabs>
                <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange} >
                    <Tab1 d={data} />
                    <Tab2 d={data} />
                    <Tab3 d={data} />
                </SwipeableViews>
                </div>
            );
        }
    }
}

export default Details;