import React, { Component } from 'react';

// ui
import LogsheetViewer from './LogsheetViewer'
import SwipeableViews from 'react-swipeable-views';

import SingleLogsheet from './SingleLogsheet'

class _LogsheetVeiwer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            currentLogsheetId: null
        };
    }

    handleChange = (value, id) => {
        this.setState({
            slideIndex: value,
            currentLogsheetId: id
        });
    };

    render() {
        return (
            <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange}>
                <LogsheetViewer handleChange={this.handleChange}/>
                <SingleLogsheet currentLogsheet={this.state.currentLogsheetId} handleChange={this.handleChange}/>
            </SwipeableViews>
        );
    }
}

export default _LogsheetVeiwer;