import React, { Component } from 'react';
import { Paper, LinearProgress, FlatButton, Divider  } from 'material-ui'
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
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        this.updateDimensions = this.updateDimensions.bind(this);
      }
    
      // setting the width and the height of the component depending on the dimension of the browser
      updateDimensions() {
          this.setState({width: window.innerWidth, height: window.innerHeight});
      }
    
      // update the component width and height before mounting
      componentWillMount() {
          this.updateDimensions();
      }
    
      // add an event listener to the component when user resizes the browser window
      // attach updateDimension to the resize event
      componentDidMount() {
          window.addEventListener("resize", this.updateDimensions);
      }
    
      // remove the listener
      componentWillUnmount() {
          window.removeEventListener("resize", this.updateDimensions);
      }

    render() {

        if(this.props.results) {
            if(this.props.results.loading) {
                return(<LinearProgress mode='indeterminate' />)
            }
        }

        return (
            <Paper style={{ padding: '10px', width: '810px', marginTop: '10px'}}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                    {
                        this.props.results ? 
                        <div>{this.props.results.data.searchLogsheet.length} logsheet/s found</div> : <div> </div>
                    }
                </div>
                <Divider/>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignContent: 'flex-start', height: this.state.height - 135, overflow: 'scroll' }} >
                    {
                        this.props.results ? this.props.results.data.searchLogsheet.map((r) => {
                            return (
                                <div key={r.id} style={{ transform: 'translate(0px, 0px)', margin: '10px' }}>
                                    <TouchRipple>
                                        <Paper onClick={()=> console.log(r.id)}  style={paperStyle} >
                                            <SingleItem sitename={r.site.name} date={moment(new Date(r.logsheet_date)).format('LL')}/>
                                        </Paper>
                                    </TouchRipple>
                                </div>
                            )
                        }) : null
                    }
                </div>
            </Paper>
        );
    }
}

export default SearchResults;