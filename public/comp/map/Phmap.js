import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { GoogleApiWrapper, InfoWindow, Marker, Map } from 'google-maps-react'

import ContainerDimensions from 'react-container-dimensions'

const apiKey = 'AIzaSyBel2WYgGz9FzJenyjQM_O9Et2x9uEeId8';


class Phmap extends Component {
    
    render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <div >
        <Map google={this.props.google} containerStyle={{ width: this.props.width - 10, height: this.props.height - 90 }} />
      </div>
    )
  }
}


export default GoogleApiWrapper({
    apiKey: apiKey,
    version: '3.27'
})(Phmap);
