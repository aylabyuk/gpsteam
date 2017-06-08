import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { changeClickedSite } from '../../actions/index'
import { connect } from 'react-redux'

import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet'
import scrollIntoView from 'scroll-into-view'

let siteIcon = L.divIcon({
          className: '',
          iconSize: [24, 24],
          html: `<div id="icn" />`,
        });


function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

class Phmap extends Component {
  constructor() {
    super();
    this.state = {
      lat: 12.8797,
      lng: 121.7740,
      zoom: 6,
      maxZoom: 40,
      clustering: true,
      clusterIsSet: false
    };
  }
  

  handleMarkerClick(marker) {
    let sitename =  marker.getTooltip().getContent() 
    let element = document.getElementById(sitename)
    scrollIntoView( element , {
      time: 200
    }, (type) => { this.props.changeClickedSite(sitename) }  )
  }

  handleMarkerHover(marker) {

  }

  componentDidUpdate(prevProps, prevState) {

      // uncomment to see Ph bounding box
      // if(window.leafletmap) {
      //   let map = window.leafletmap.leafletElement
      //   let bounds = [[21.12178056, 126.60500000], [4.41495556, 114.28194444]];
      //   L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);
      //   map.fitBounds(bounds);
      // }
      
  }
  

  setCluster() {
    this.setState({clusterIsSet: true})
  }
  
  render() {
    const position = [this.state.lat, this.state.lng];

    let { loading, markers } = this.props

    if(loading) {
      return(<h1>Loading map...</h1>)
    } else {
      
      // to see distances less than 0.5 km radius
      // for(let i = 0; i< markers.length; i++) {
      //   for(let j = 0; j<markers.length; j++) {

      //     let distanxa = distance(markers[i].lat, markers[i].lng, markers[j].lat, markers[j].lng )

      //     if(distanxa <= 0.01 && distanxa != 0) {
      //       console.log(markers[i].id + ' - ' + markers[j].id + ' = ' + distanxa)
      //     }

      //   }
      // }

      // to check if markers are within the Ph bounds
      let bounds = [[21.12178056, 126.60500000], [4.41495556, 114.28194444]];
      let rect = L.rectangle(bounds, {color: "#ff7800", weight: 1})

      for(let i = 0; i< markers.length; i++) {
        let isInside = rect.getBounds().contains(new L.LatLng(markers[i].lat, markers[i].lng))
        !isInside ? console.log(markers[i].id) : null
      }


      return (
        <div id='this' style={{width: this.props.width, height: this.props.height}}>
        <Map center={position} zoom={this.state.zoom} maxZoom={this.state.maxZoom} style={{height: this.props.height}} zoomSnap 
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
              onMarkerClick={(marker) => this.handleMarkerClick(marker) } 
              ref={(markerClusterGroup) => {

                if(!this.state.clusterIsSet) {
                  //console.log(this.state.clusterIsSet)
                  window.markerClusterGroup = markerClusterGroup.leafletElement 
                  window.markerClusterGroup.on('mouseover', (marker) => {
                    this.handleMarkerHover(marker.layer)
                  })
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