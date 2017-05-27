import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import GoogleMapReact from 'google-map-react';


class Phmap extends Component {
  static defaultProps = {
    center: {lat: 12.8797, lng: 121.7740},
    zoom: 6
  };

  render() {
    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        
      </GoogleMapReact>
    );
  }
}

export default Phmap
