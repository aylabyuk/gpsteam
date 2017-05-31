import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet'
import scrollIntoView from 'scroll-into-view'

let siteIcon = L.divIcon({
          className: '',
          iconSize: [24, 24],
          html: `<div id="icn" />`,
        });

export default class Phmap extends Component {
  constructor() {
    super();
    this.state = {
      lat: 12.8797,
      lng: 121.7740,
      zoom: 6,
      maxZoom: 40,
      clustering: true
    };
  }

  handleMarkerClick(marker) {
    console.log('click',marker.getTooltip().getContent())
  }

  handleMarkerHover(marker) {
    let element = document.getElementById( marker.getTooltip().getContent() )
    scrollIntoView( element , {
      time: 200
    }, (type) => { element.children[0].children[0].classList.add('viewing'), console.log(element) }  )
  }
  
  render() {
    const position = [this.state.lat, this.state.lng];

    let { loading, markers } = this.props

    if(loading) {
      return(<h1>Loading map...</h1>)
    } else {
      return (
        <div id='this' style={{width: this.props.width, height: this.props.height}}>
        <Map center={position} zoom={this.state.zoom} maxZoom={this.state.maxZoom} style={{height: this.props.height}} zoomSnap >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />

          { this.state.clustering ? 
            <MarkerClusterGroup
              markers={markers}
              wrapperOptions={{enableDefaultStyle: true}} 
              onMarkerClick={(marker) => this.handleMarkerClick(marker) } 
              ref={(markerClusterGroup) => {
                this.markerClusterGroup = markerClusterGroup.leafletElement

                this.markerClusterGroup.on('mouseover', (marker) => {
                  this.handleMarkerHover(marker.layer)
                }) 

            }}/>
                         
            : markers.map((s)=> {
              return (<Marker position={[s.lat, s.lng]}  key={s.tooltip} riseOnHover icon={siteIcon}>
                <Tooltip>
                  <span>{s.tooltip}</span>
                </Tooltip>
              </Marker>)
            }) }

        </Map>
        </div >
      )
    }
  }
}