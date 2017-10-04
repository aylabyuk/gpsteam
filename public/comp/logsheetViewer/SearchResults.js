import React, { Component } from 'react';
import { Paper, LinearProgress, FlatButton  } from 'material-ui'
import TouchRipple  from 'material-ui/internal/TouchRipple'
import moment from 'moment'

import SingleItem from './SingleItem'

const paperStyle = {
 width: '240px',
 height: '200px',
 padding: '10px',
 cursor: 'pointer'
}

class SearchResults extends Component {
    render() {

        if(this.props.results) {
            if(this.props.results.loading) {
                return(<LinearProgress mode='indeterminate' />)
            }
        }

        return (
            <Paper style={{ display: 'flex', flexWrap: 'wrap', padding: '10px', maxWidth: '800px', justifyContent: 'flex-start' }}>
                {
                    this.props.results ? this.props.results.data.searchLogsheet.map((r) => {
                        return (
                            <div style={{ transform: 'translate(0px, 0px)', margin: '10px' }}>
                                <TouchRipple>
                                    <Paper key={r.id} style={paperStyle}>
                                        <SingleItem sitename={r.site.name} date={moment(new Date(r.logsheet_date)).format('LL')}/>
                                    </Paper>
                                </TouchRipple>
                            </div>
                        )
                    }) : null
                }
            </Paper>
        );
    }
}

export default SearchResults;