import React, { PureComponent } from 'react';
import L from 'leaflet'
import { connect } from 'react-redux'
import { changeClickedSite } from '../../actions/index'

// ui
import { AppBar, Paper, List, ListItem} from 'material-ui'

class RightPanel extends PureComponent {

    removePreviewMarker() {
        let leafletmap = window.leafletmap.leafletElement
        let markerToRemove = window.previewMarker

        leafletmap.removeLayer(markerToRemove)

    }

    handleSiteClick(site) {
        let leafletmap = window.leafletmap.leafletElement
        leafletmap.setView(new L.LatLng(site.lat, site.lng), 9)
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
                                        onMouseLeave={()=> this.removePreviewMarker() } onTouchTap={() => this.handleSiteClick(s)}/>
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