import React, { Component } from 'react';

// ui
import Filter from './Filter'
import SearchResults from './SearchResults'

class _LogsheetViewer extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <div id='filter'  style={{ display: 'flex', flexDirection: 'column' }}>
                <Filter />
                <SearchResults />
            </div>
        );
    }
}

export default _LogsheetViewer;