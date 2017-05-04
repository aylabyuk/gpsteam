import React, { Component } from 'react';

// ui
import LogsheetViewer from './LogsheetViewer'
import SwipeableViews from 'react-swipeable-views';

import SingleLogsheet from './SingleLogsheet'

class _LogsheetVeiwer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0
        };
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    render() {
        return (
            <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange}>
                <LogsheetViewer handleChange={this.handleChange}/>
                <SingleLogsheet handleChange={this.handleChange}/>
            </SwipeableViews>
        );
    }
}

export default _LogsheetVeiwer;