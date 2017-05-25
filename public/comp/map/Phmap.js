import React, { Component } from 'react';
import ReactDOM from 'react-dom'

class Phmap extends Component {
    render() {
        return (
            <div>
                <svg ref={(elem) => { this.svg = elem; }}>
                </svg>
            </div>
        );
    }
}

export default Phmap;