import React, { Component } from 'react';
import { IconButton } from 'material-ui'
import moment from 'moment'

class SingleItem extends Component {
    render() {
        let { sitename, date } = this.props

        return (
            <div>
                <strong>{sitename}</strong> <br/> {moment(new Date(date)).format('dddd - LL')}
            </div>
        );
    }
}

export default SingleItem;