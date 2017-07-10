import React, { Component } from 'react';

// ui
import LogsheetViewer from './LogsheetViewer'
import SingleLogsheet from './SingleLogsheet'
import Filter from './Filter'

import SwipeableViews from 'react-swipeable-views';


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
            <div>
            <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange} disabled={true}>
                <Filter handleChange={this.handleChange}/>
                <LogsheetViewer handleChange={this.handleChange}/>
                <SingleLogsheet currentLogsheet={this.state.currentLogsheetId} handleChange={this.handleChange}/>
            </SwipeableViews>
            </div>
        );
    }
}

export default _LogsheetVeiwer;