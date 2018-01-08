import React, { Component } from 'react'
import { Map, TileLayer,  } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { client } from '../index'
import gql from 'graphql-tag';
import L from 'leaflet'
import SearchIcon from 'material-ui-icons/Search';
import LayersIcon from 'material-ui-icons/Layers';

import Paper from 'material-ui/Paper'
import Checkbox from 'material-ui/Checkbox';
import {
    FormLabel,
    FormControl,
    FormGroup,
    FormControlLabel,
    FormHelperText,
} from 'material-ui/Form';

import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css'
import 'leaflet-extra-markers/dist/js/leaflet.extra-markers.min.js'
import 'font-awesome/css/font-awesome.min.css'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css'
import 'leaflet.smooth_marker_bouncing'
import { setSelectedSite } from './mapActions';
import Control from 'react-leaflet-control';

let campaignIcon = (name) => L.ExtraMarkers.icon({
    icon: 'fa-circle',
    iconColor: 'white',
    markerColor: 'cyan',
    shape: 'square',
    prefix: 'fa',
    name,
    innerHTML: `<div class='markerLabel'><b>${name}</b></div>`
})

let continuousIcon = (name) => L.ExtraMarkers.icon({
    icon: 'fa-circle',
    iconColor: 'white',
    markerColor: 'pink',
    shape: 'square',
    prefix: 'fa',
    name,
    innerHTML: `<div class='markerLabel'><b>${name}</b></div>`
})

class PhMap extends Component {
    constructor() {
        super();
        this.state = {
            showCampaignSites: true,
            showContinuousSites: true,
            showFaultLines: true,
            enableCluster: true,
            showSettings: false,
            mapIsSet: false,
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
                }),
            markersCamp: null,
            markersCont: null
        };
    }

    handleMarkerClick = (marker) => {
        this.props.openDrawer().then(() => {

            this.props.setSelectedSite(marker.options.icon.options.name)

            setTimeout(() => {
                window.map.leafletElement.invalidateSize(true)
            }, 500)

            window.map.leafletElement.setView(marker.getLatLng())

            marker.setBouncingOptions({
                bounceHeight: 10,
                bounceSpeed: 54,
                exclusive: true,
                elastic: false
            })

            if(!marker.isBouncing()) {
                marker.bounce()
            }
            
        })
    }

    handleChange = name => (event, checked) => {
        this.setState({ [name]: checked });
    };
    

    componentDidMount() {
        const markers = this.state.sites.sites.filter(s => {
            return s.latitude && s.surveyType
        }).map(s => {
            return {
                id: s.id,
                name: s.name,
                position: [s.latitude, s.longitude],
                surveyType: s.surveyType.type,
                options: {
                    icon: s.surveyType.type === 'campaign' ? campaignIcon(s.name) : continuousIcon(s.name),
                }
            }
        })

        const markersCamp = markers.filter(m => {
            return m.surveyType === 'campaign'
        })

        const markersCont = markers.filter(m => {
            return m.surveyType === 'continuous'
        })

        this.setState({ mapIsSet: true, markersCamp, markersCont })
    }
    
    render() {
        const { lat, lng, zoom, maxZoom, minZoom, sites, maxBounds, showCampaignSites, 
            showContinuousSites, showFaultLines, showSettings, mapIsSet, enableCluster, markersCamp, markersCont } = this.state
        
        let newMarkers = []
        if(window.map) {
            window.map.leafletElement.invalidateSize(true)
            let camp, cont
            if(showCampaignSites) {
                camp = markersCamp
            } else {
                camp = []
            }

            if(showContinuousSites) {
                cont = markersCont
            } else {
                cont = []
            }
            newMarkers = camp.concat(cont)
        }

        return (
            <Map center={[lat, lng]} 
                zoom={zoom} minZoom={minZoom} maxZoom={maxZoom} zoomSnap style={{ height: '100%' }}
                maxBounds={maxBounds} zoomControl={false} ref={(map) => {
                    window.map = map 
                    if(map && !mapIsSet) {
                        L.control.zoom({
                            position: 'topright'
                        }).addTo(map.leafletElement)
                    }
                }}>

                <TileLayer
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>

                <Control position="topright" >
                    <div className='leaflet-bar' style={{visibility: this.props.isDrawerOpen ? 'hidden' : 'visible' }}>
                        <a className='leaflet-control-custom' onClick={(e) => {
                            e.preventDefault()
                            this.props.openDrawer()

                            setTimeout(() => {
                                document.getElementById('search-input').focus()
                            }, 500)

                        }} role='button' href=''>
                            <SearchIcon />
                        </a>
                    </div>
                </Control>

                <Control position="bottomright" >
                    <div className='leaflet-bar'
                        onMouseOver={()=> this.setState({ showSettings: true })}
                        onMouseOut={()=> this.setState({ showSettings: false })}>
                        <a style={{display: !showSettings ? 'block' : 'none' }} 
                            className='leaflet-control-custom' onClick={(e) => {
                                e.preventDefault()
                            }} role='button' href=''>
                                <LayersIcon />
                        </a>
                        <div style={{display: showSettings ? 'block' : 'none'}}>
                            <Paper style={{ padding: '10px' }}>
                                <FormControl component="fieldset">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={showCampaignSites}
                                            onChange={this.handleChange('showCampaignSites')} />} label="Campaign"/>
                                        <FormControlLabel control={<Checkbox checked={showContinuousSites}
                                            onChange={this.handleChange('showContinuousSites')} />} label="Continuous"/>
                                        <FormControlLabel control={<Checkbox checked={enableCluster}
                                            onChange={this.handleChange('enableCluster')} />} label="Cluster"/>
                                        <FormControlLabel control={<Checkbox checked={showFaultLines}
                                            onChange={this.handleChange('showFaultLines')} />} label="Faultline"/>
                                    </FormGroup>
                                </FormControl>
                            </Paper>
                        </div>
                    </div>
                </Control>

                {mapIsSet ? <MarkerClusterGroup 
                    markers={newMarkers}
                    onMarkerClick={this.handleMarkerClick}
                    ref={(cluster) => {
                        window.cluster = cluster
                }}/> : null}

            </Map>
        )
    }
}

export default PhMap