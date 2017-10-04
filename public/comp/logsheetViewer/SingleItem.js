import React, { Component } from 'react';
import { IconButton } from 'material-ui'
import moment from 'moment'

class SingleItem extends Component {
    render() {
        let { sitename, date, createdAt, updatedAt } = this.props

        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <strong>{sitename}</strong> 
                <big>{date}</big>
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <small>created {moment(new Date(createdAt)).startOf('second').fromNow()} by testauthor</small>
                </div>
            </div>
        );
    }
}

export default SingleItem;