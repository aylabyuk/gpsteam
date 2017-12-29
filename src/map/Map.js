import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { client } from '../index'
import gql from 'graphql-tag';

import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css'

class PhMap extends Component {
    constructor() {
        super();
        this.state = {
          lat: 12.8797,
          lng: 121.7740,
          zoom: 6,
          maxZoom: 18,
          minZoom: 6,
          sites: client.readQuery({
                query: gql`
                    {
                        sites {
                            id
                            name
                            description
                            location
                            longitude
                            latitude 
                        }
                    }
                `
            })
        };
    }

    render() {
        const { lat, lng, zoom, maxZoom, minZoom, sites } = this.state
        
        const markers = sites.sites.filter(s => {
            return s.latitude
        }).map(s => {
            return {
                position: [s.latitude, s.longitude]
            }
        })

        return (
            <Map center={[lat, lng]} 
                zoom={zoom} minZoom={minZoom} maxZoom={maxZoom} zoomSnap style={{ height: '100%' }}>

                <TileLayer
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>

                <MarkerClusterGroup markers={markers} />

            </Map>
        )
    }
}

export default PhMap