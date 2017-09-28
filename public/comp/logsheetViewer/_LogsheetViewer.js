import React, { Component } from 'react';

// ui
import Filter from './Filter'

import SwipeableViews from 'react-swipeable-views';


class _LogsheetVeiwer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
    }

    handleChange = (value, id) => {
        this.setState({
            slideIndex: value,
        });
    };

    render() {
        return (
            <div>
            <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange} disabled={true}>
                <Filter handleChange={this.handleChange}/>
            </SwipeableViews>
            </div>
        );
    }
}

export default _LogsheetVeiwer;