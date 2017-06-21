import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { changeClickedSite } from '../../actions/index'
import { connect } from 'react-redux'

import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet'
import scrollIntoView from 'scroll-into-view'

import SitePopup from './SitePopup'
 
let siteIcon = L.divIcon({
          className: '',
          iconSize: [24, 24],
          html: `<div id="icn" />`,
        });

class Phmap extends Component {
  constructor() {
    super();
    this.state = {
      lat: 12.8797,
      lng: 121.7740,
      zoom: 6,
      maxZoom: 20,
      minZoom: 6,
      clustering: true,
      clusterIsSet: false,
      popup: false
    };
  }

  setCluster() {
    this.setState({clusterIsSet: true})
  }

  removePopup = () => {
    this.setState({
      popup: false
    })
  }

  addPopup = (marker) => {
    this.setState({
      popup: { 
        key: marker._tooltip._content,
        position: marker.getLatLng()
      }
    })
  }
  
  render() {
    const position = [this.state.lat, this.state.lng];

    let { loading, markers } = this.props

    if(loading) {
      return(<h1>Loading map...</h1>)
    } else {
      return (
        <div id='this' style={{width: this.props.width, height: this.props.height}}>
        <Map center={position} zoom={this.state.zoom} minZoom={this.state.minZoom} maxZoom={this.state.maxZoom} style={{height: this.props.height}} zoomSnap
          ref={(leafletmap) => {
              window.leafletmap = leafletmap
            }
          }>

          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />

          { this.state.clustering ? 
            <MarkerClusterGroup
              markers={markers}
              wrapperOptions={{enableDefaultStyle: true}} 
              onMarkerClick={(marker) => this.addPopup(marker) }
              ref={(markerClusterGroup) => {

                if(!this.state.clusterIsSet) {
                  //console.log(this.state.clusterIsSet)
                  window.markerClusterGroup = markerClusterGroup.leafletElement 
                  this.setCluster()
                }

              }}
            />
                         
            : markers.map((s)=> {
              return (<Marker position={[s.lat, s.lng]}  key={s.tooltip} riseOnHover icon={siteIcon}>
                <Tooltip>
                  <span>{s.tooltip}</span>
                </Tooltip>
              </Marker>)
            }) }

            {this.state.popup && 
              <Popup
                key={`popup-${this.state.popup.key + Math.random()}`}
                position={this.state.popup.position} 
                children={<SitePopup popup={this.state.popup} remove={this.removePopup}/>} 
                ref={(popup) => {
                  
                }} />
            }

        </Map>
        </div >
      )
    }
  }
}

function mapStateToProps(state) {  
	return {
		clickedSite: state.ui.clickedSite
	}
}

export default connect(mapStateToProps, { changeClickedSite })(Phmap);