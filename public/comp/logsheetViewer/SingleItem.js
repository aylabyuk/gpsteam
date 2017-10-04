import React, { Component } from 'react';
import { IconButton } from 'material-ui'

class SingleItem extends Component {
    render() {
        let { sitename, date } = this.props

        return (
            <div>
                {sitename} <br/> {date}
            </div>
        );
    }
}

export default SingleItem;