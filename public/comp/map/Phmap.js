import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'


export default class Phmap extends Component {
  constructor() {
    super();
    this.state = {
      lat: 12.8797,
      lng: 121.7740,
      zoom: 6,
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    
    return (
      <div id='this' style={{width: this.props.width, height: this.props.height}}>
      <Map center={position} zoom={this.state.zoom} style={{height: this.props.height}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
          </Popup>
        </Marker>
      </Map>
      </div >
    )
  }
}
