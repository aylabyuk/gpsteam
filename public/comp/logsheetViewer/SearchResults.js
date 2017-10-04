import React, { Component } from 'react';
import { Paper, LinearProgress, FlatButton  } from 'material-ui'
import moment from 'moment'
import PaperMaterial from 'material-paper'

import { selectedTheme  } from '../../MainComponent'

import SingleItem from './SingleItem'

var paperSettings = {
    background: '#fff',
    style: {
      margin: '10px',
      height: '200px',
      width: '240px'
    },
    overlayColor: selectedTheme.paper.zDepthShadows,
    burstSpeed: 2000,
    burstColor: undefined,
    clickable: true,
    liftOnHover: true,
    liftOnClick: true,
    zDepth: 1
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
                            <PaperMaterial key={r.id} settings={paperSettings}>
                                <SingleItem sitename={r.site.name} date={moment(new Date(r.logsheet_date)).format('LL')}/>
                            </PaperMaterial>
                        )
                    }) : null
                }
            </Paper>
        );
    }
}

export default SearchResults;