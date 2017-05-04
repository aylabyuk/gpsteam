import React, { Component } from 'react';

// ui
import { CircularProgress } from 'material-ui'


class Details extends Component {
    render() {
        let { data, loading } = this.props

        if(loading) {
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
                    {JSON.stringify(data, null, "\t")}
                </div>
            );
        }
    }
}

export default Details;