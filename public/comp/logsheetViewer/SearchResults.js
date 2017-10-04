import React, { Component } from 'react';
import { Paper, CircularProgress, FlatButton, Divider  } from 'material-ui'
import TouchRipple  from 'material-ui/internal/TouchRipple'
import moment from 'moment'
import ActionDescription from 'material-ui/svg-icons/action/description';


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

        let emptyPaper = {
             height: this.state.height - 135,  
             display: 'flex', 
             alignItems: 'center', 
             flexDirection: 'column',
             justifyContent: 'center',  
             padding: '10px', 
             width: '810px', 
             marginTop: '10px',
             color: 'rgba(219, 219, 219, 0.8)'
        }

        if(this.props.results) {
            if(this.props.results.loading) {
                return(
                    <Paper style={emptyPaper}>
                        <CircularProgress size={150} thickness={15}  mode='indeterminate' />
                    </Paper>
                )
            }
        } else {
            return(
                <Paper style={emptyPaper}>
                    <ActionDescription style={{ width: '200px', height: '200px'  }}  color='rgba(219, 219, 219, 0.8)'/>
                    <big>logsheet results are displayed here</big>
                </Paper>
            )
        }

        return (
            <Paper style={{ padding: '10px', width: '810px', marginTop: '10px'}}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                    {
                        this.props.results ? 
                        <div><div>{this.props.results.data.searchLogsheet.length} logsheet/s found</div> <Divider/></div> : null
                    }
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignContent: 'flex-start', height: this.state.height - 135, overflow: 'scroll' }} >
                    {
                        this.props.results ? this.props.results.data.searchLogsheet.map((r) => {
                            return (
                                <div key={r.id} style={{ transform: 'translate(0px, 0px)', margin: '10px' }}>
                                    <TouchRipple>
                                        <Paper onClick={()=> console.log(r.id)}  style={paperStyle} >
                                            <SingleItem sitename={r.site.name} date={moment(new Date(r.logsheet_date)).format('LL')} 
                                                createdAt={r.createdAt}
                                                updatedAt={r.updatedAt}/>
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