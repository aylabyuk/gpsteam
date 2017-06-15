import React, { PureComponent } from 'react';

// ui
import LogsheetViewer from './LogsheetViewer'
import SwipeableViews from 'react-swipeable-views';

import SingleLogsheet from './SingleLogsheet'

class _LogsheetVeiwer extends PureComponent {
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
            <div style={{height: '100%'}}>
            <SwipeableViews style={{height: '100%'}} containerStyle={{height: '100%'}} index={this.state.slideIndex} onChangeIndex={this.handleChange}>
                <LogsheetViewer handleChange={this.handleChange}/>
                <SingleLogsheet currentLogsheet={this.state.currentLogsheetId} handleChange={this.handleChange}/>
            </SwipeableViews>
            </div>
        );
    }
}

export default _LogsheetVeiwer;