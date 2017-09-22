import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { changeClickedSite } from '../../actions/index'
import { connect } from 'react-redux'
import MapsPlace from 'material-ui/svg-icons/maps/place'

// ui
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet'
import scrollIntoView from 'scroll-into-view'

// graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { apolloClient } from '../../_primary' 

import SitePopup from './SitePopup'

import omnivore from 'leaflet-omnivore'

// server
import { ip, PORT } from '../../_primary'

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
// get the timeseries jpg file
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

// cluster styling
// Define object with Leaflet.markercluster options
const markerclusterOptions = {
    showCoverageOnHover: false,
    spiderfyDistanceMultiplier: 2,

    // Setting custom icon for clustere group
    // https://github.com/Leaflet/Leaflet.markercluster#customising-the-clustered-markers
    iconCreateFunction: (cluster) => {
      return L.divIcon({
        html: `<span>${cluster.getChildCount()}</span>`,
        className: 'marker-cluster-custom',
        iconSize: L.point(40, 40, true)
      });
    },
};
 
// siteIcon object is of type divIcon used by leaflet to set the appearance of the markers 
let sIcon = L.icon({
  iconUrl: 'http://'+ ip + PORT + '/marker.png',
  iconSize: [30, 41],
  iconAnchor: [15, 41],
  popupAnchor: [15, -21]
})

let siteMarkers = {
  icon: sIcon
}

// cluster coverage 
let coverage = {
  fillColor: 'rgb(179, 136, 255)',
  color: 'rgb(179, 136, 255)',
  weight: 0.5,
  opacity: 1,
  fillOpacity: 0.5
}


// Phmap is the map container managed by React but still using the leaflet library to display the map component
class Phmap extends Component {
  constructor() {
    super();
    this.state = {
      lat: 12.8797,
      lng: 121.7740,
      zoom: 6,
      maxZoom: 19,
      minZoom: 6,
      clustering: true,
      mapIsSet: false,
      clusterIsSet: false,
      popup: false,
      path: ''
    };
  }

  // run this function to change the cluster state of the map
  // this will stop markers from clustering
  setCluster() {
    this.setState({clusterIsSet: true})
  }

  // remove the popup when clicked outside the marker
  removePopup = () => {
    this.setState({
      popup: false
    })
  }

  // add the popup on the screen when user clicked the marker
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
    // get the position of the maps center
    const position = [this.state.lat, this.state.lng];

    // when data is loaded display the map
    let { loading, markers } = this.props
    if(loading) {
      return(<h1>Loading map...</h1>)
    } else {
      return (
        <div id='this' style={{width: this.props.width, height: this.props.height}}>
          <Map center={position} zoom={this.state.zoom} minZoom={this.state.minZoom} maxZoom={this.state.maxZoom} style={{height: this.props.height}} zoomSnap
            ref={(leafletmap) => {
                if(!this.state.mapIsSet) {
                  window.leafletmap = leafletmap

                  // load the fault lines
                  let layer = L.geoJSON(null, { style: function(feature) {
                        return { color: '#FF0000', weight: 0.8 };
                    } })

                  // use omnivore library to parse kml file to geoJson
                  // then add the geoJson file to the leaflet element/map
                  omnivore.kml('http://'+ ip + PORT + '/faultline/AF_2017.kml', null, layer).addTo(leafletmap.leafletElement)
                  // set the state
                  this.setState({mapIsSet: true})
                }
              }
            }>

            {/*  add proper attribution and url to the TileLayer  */}
            <TileLayer
              attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
              url='http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
            />

           
            <MarkerClusterGroup
              markers={markers}
              wrapperOptions={{enableDefaultStyle: true}} 
              markerOptions={siteMarkers}
              options={markerclusterOptions}
              onMarkerClick={(marker) => this.addPopup(marker) }
              ref={(markerClusterGroup) => {

                {/*  set the reference for this component to the window object of the browser to make it accessible anywhere  */}
                if(!this.state.clusterIsSet) {
                  //console.log(this.state.clusterIsSet)
                  window.markerClusterGroup = markerClusterGroup.leafletElement 
                  {/* call the setCluster function to tell the app that the markers are set */}
                  this.setCluster()

                }
              }}
            />
      

              {/*  if the popup state is true
              then show the popup component for the clicked site/marker
              use the sitename as the popup key
                */}
              {this.state.popup && 
                <Popup
                  key={`popup-${this.state.popup.key + Math.random()}`}
                  position={this.state.popup.position} 
                  children={
                    <SitePopup popup={this.state.popup} previewUrl={this.state.previewUrl} remove={this.removePopup} handleViewDetails={this.props.handleViewDetails}
                      newPreview={this.handleNewPreview} requestPreview={this.requestForPreview} filename={this.state.filename}/> 
                    }/>
              }

          </Map>

        </div >
      )
    }
  }
}

// get the global state value of the clickedSite and map it as props for the Phmap component
function mapStateToProps(state) {  
	return {
		clickedSite: state.ui.clickedSite
	}
}

// export the componnent with the HOC connecting mapStateToProps and the action changeClickedSite
export default connect(mapStateToProps, { changeClickedSite })(Phmap);