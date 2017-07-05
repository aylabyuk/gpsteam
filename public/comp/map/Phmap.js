import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { changeClickedSite } from '../../actions/index'
import { connect } from 'react-redux'

// ui
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet'
import { Drawer } from 'material-ui'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet'
import scrollIntoView from 'scroll-into-view'

// graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { apolloClient } from '../../_primary' 

import SitePopup from './SitePopup'

const uploadPreview = gql`
    mutation updateSiteTimeseriesPreview(
        $siteName: String!,
        $timeseriesPreview: File!
    ) {
        updateSiteTimeseriesPreview(siteName: $siteName, timeseriesPreview: $timeseriesPreview)
        {
            id
            name
            type
            size
            path
        }
    }
`

const getPreview = gql`
    query siteTimeseriesPreview(
        $name: String!
    ) {
        siteTimeseriesPreview(name: $name) {
            path
            type
            name
            size
        }
    }
`
 
let siteIcon = L.divIcon({
          className: '',
          iconSize: [24, 24],
          html: `<div id="icn" />`,
        });

class Phmap extends Component {
  constructor() {
    super();
    this.state = {
      lat: 12.8797,
      lng: 121.7740,
      zoom: 6,
      maxZoom: 20,
      minZoom: 6,
      clustering: true,
      clusterIsSet: false,
      popup: false,
      path: ''
    };
  }

  setCluster() {
    this.setState({clusterIsSet: true})
  }

  removePopup = () => {
    this.setState({
      popup: false
    })
  }

  addPopup = (marker) => {
    this.setState({
      popup: { 
        key: marker._tooltip._content,
        position: marker.getLatLng()
      }
    })
  }

  handleNewPreview({target}) {
    apolloClient.mutate({mutation: uploadPreview, variables: { siteName: this.props.popup.key, timeseriesPreview: target.files[0] } })
      .then((d) => {
        console.log('got data ',d)
        // this.setState({ path: d.data.updateSiteTimeseriesPreview.path })
      }).catch((err) => {
        console.log(err)
      })
  }
  
  render() {
    const position = [this.state.lat, this.state.lng];

    let { loading, markers } = this.props

    if(loading) {
      return(<h1>Loading map...</h1>)
    } else {
      return (
        <div id='this' style={{width: this.props.width, height: this.props.height}}>
        <Map center={position} zoom={this.state.zoom} minZoom={this.state.minZoom} maxZoom={this.state.maxZoom} style={{height: this.props.height}} zoomSnap
          ref={(leafletmap) => {
              window.leafletmap = leafletmap
            }
          }>

          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />

          { this.state.clustering ? 
            <MarkerClusterGroup
              markers={markers}
              wrapperOptions={{enableDefaultStyle: true}} 
              onMarkerClick={(marker) => this.addPopup(marker) }
              ref={(markerClusterGroup) => {

                if(!this.state.clusterIsSet) {
                  //console.log(this.state.clusterIsSet)
                  window.markerClusterGroup = markerClusterGroup.leafletElement 
                  this.setCluster()
                }

              }}
            />
                         
            : markers.map((s)=> {
              return (<Marker position={[s.lat, s.lng]}  key={s.tooltip} riseOnHover icon={siteIcon}>
                <Tooltip>
                  <span>{s.tooltip}</span>
                </Tooltip>
              </Marker>)
            }) }

            {this.state.popup && 
              <Popup
                key={`popup-${this.state.popup.key + Math.random()}`}
                position={this.state.popup.position} 
                children={
                  <SitePopup popup={this.state.popup} previewUrl={this.state.previewUrl} remove={this.removePopup}
                    newPreview={this.handleNewPreview} requestPreview={this.requestForPreview} filename={this.state.filename}/> 
                  }/>
            }

        </Map>
        </div >
      )
    }
  }
}

function mapStateToProps(state) {  
	return {
		clickedSite: state.ui.clickedSite
	}
}

export default connect(mapStateToProps, { changeClickedSite })(Phmap);