import React, { Component } from 'react';
import moment from 'moment'
import { Paper } from 'material-ui'

class Meta extends Component {
    render() {
        let { author, createdAt, updatedAt  } = this.props.data

        return (
            <Paper style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px', paddingTop: '10px', paddingBottom: '10px' }}>
                <div>author: { author.username } </div>
                <div>created: { moment(createdAt).startOf('second').fromNow()  } </div>
                <div>modified: { moment(updatedAt).startOf('second').fromNow()  } </div>
            </Paper>
        );
    }
}

export default Meta;