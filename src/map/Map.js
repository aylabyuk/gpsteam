import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

export default class PhMap extends Component {
    constructor() {
        super();
        this.state = {
          lat: 12.8797,
          lng: 121.7740,
          zoom: 6,
          maxZoom: 18,
          minZoom: 6
        };
      }

    render() {
        const { lat, lng, zoom, maxZoom, minZoom } = this.state

        return (
            <Map center={[lat, lng]} 
                zoom={zoom} minZoom={minZoom} maxZoom={maxZoom} zoomSnap style={{ height: '100vh' }}>

                <TileLayer
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>


            </Map>
        )
    }
}
