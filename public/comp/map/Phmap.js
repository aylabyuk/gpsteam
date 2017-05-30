import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import GoogleMapReact from 'google-map-react';

import Marker from './Marker'

const API_KEY = 'AIzaSyBel2WYgGz9FzJenyjQM_O9Et2x9uEeId8';

class Phmap extends Component {
  static defaultProps = {
    center: {lat: 12.8797, lng: 121.7740},
    zoom: 6
  };

  createMapOptions() {
    return {
      mapTypeControl: true
    }
  }

  render() {
    let { markers, loading } = this.props

    if(loading) {
      return(
        <h1>loading map...</h1>
      )
    } else {

      const SiteNodes = this.props.markers
      .map((site, index) => (
        <Marker
          // required props
          key={index}
          lat={site.lat}
          lng={site.lng} 
          sitename={site.id}/>
      ));


      return (
        <div id='this' style={{width: this.props.width, height: this.props.height}}>
          <GoogleMapReact
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            bootstrapURLKeys={{
                key: API_KEY,
            }}
            options={this.createMapOptions}
            resetBoundsOnResize ={true}
          >

          {SiteNodes}
            
          </GoogleMapReact>
        </div>
      );
    }

    
  }
}

export default Phmap
