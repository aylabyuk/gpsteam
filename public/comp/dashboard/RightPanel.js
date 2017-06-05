import React, { Component } from 'react';
import L from 'leaflet'

// ui
import { AppBar, Paper, List, ListItem} from 'material-ui'

class RightPanel extends Component {

    removePreviewMarker() {
        let leafletmap = window.leafletmap.leafletElement
        let markerToRemove = window.previewMarker

        leafletmap.removeLayer(markerToRemove)

    }

    render() {
        return (
            <div style={{width: this.props.dimensions.width, height: this.props.dimensions.height, overflowY: 'scroll', overflowX: 'hidden'}}>
                <List>
                    {
                        this.props.sites.map((s)=> {
                            return(
                                <div className='listitem'  key={s.id} >
                                    <ListItem primaryText={s.id} id={s.id} ref={s.id} onMouseEnter={() => this.props.changeHoveredSite(s.id)} 
                                        onMouseLeave={()=> this.removePreviewMarker() }/>
                                </div>
                            )
                        })
                    }
                </List>
            </div>
        );
    }
}


export default RightPanel