import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { client } from '../index'
import gql from 'graphql-tag';

import L from 'leaflet'

import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css'
import 'leaflet-extra-markers/dist/js/leaflet.extra-markers.min.js'
import 'font-awesome/css/font-awesome.min.css'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css'

let campaignIcon = (name) => L.ExtraMarkers.icon({
    icon: 'fa-circle',
    iconColor: 'white',
    markerColor: 'cyan',
    shape: 'square',
    prefix: 'fa',
    innerHTML: `<div class='markerLabel'><b>${name}</b></div>`
})

let continuousIcon = (name) => L.ExtraMarkers.icon({
    icon: 'fa-circle',
    iconColor: 'white',
    markerColor: 'pink',
    shape: 'square',
    prefix: 'fa',
    innerHTML: `<div class='markerLabel'><b>${name}</b></div>`
})

class PhMap extends Component {
    constructor() {
        super();
        this.state = {
          lat: 12.8797,
          lng: 121.7740,
          zoom: 6,
          maxZoom: 18,
          minZoom: 6,
          maxBounds: new L.LatLngBounds([2.6138389710984824, 103.38134765625001], [21.555284406923192, 145.56884765625003]),
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
                            surveyType {
                                type
                            }
                        }
                    }
                `
            })
        };
    }

    render() {
        const { lat, lng, zoom, maxZoom, minZoom, sites, maxBounds } = this.state
        
        const markers = sites.sites.filter(s => {
            return s.latitude && s.surveyType
        }).map(s => {
            return {
                position: [s.latitude, s.longitude],
                surveyType: s.surveyType.type,
                options: {
                    icon: s.surveyType.type === 'campaign' ? campaignIcon(s.name) : continuousIcon(s.name),
                }
            }
        })

        return (
            <Map center={[lat, lng]} 
                zoom={zoom} minZoom={minZoom} maxZoom={maxZoom} zoomSnap style={{ height: '100%' }}
                maxBounds={maxBounds}>

                <TileLayer
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>

                <MarkerClusterGroup 
                    markers={markers}/>

            </Map>
        )
    }
}

export default PhMap