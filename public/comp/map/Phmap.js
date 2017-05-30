import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';


export default class Phmap extends Component {
  constructor() {
    super();
    this.state = {
      lat: 12.8797,
      lng: 121.7740,
      zoom: 6,
      maxZoom: 18
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];

    let { loading, markers } = this.props

    if(loading) {
      return(<h1>Loading map...</h1>)
    } else {
      return (
        <div id='this' style={{width: this.props.width, height: this.props.height}}>
        <Map center={position} zoom={this.state.zoom} maxZoom={this.state.maxZoom} style={{height: this.props.height}}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />

          <MarkerClusterGroup
            markers={markers}
            wrapperOptions={{enableDefaultStyle: true}} />

        </Map>
        </div >
      )
    }
  }
}
