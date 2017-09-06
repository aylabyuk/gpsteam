import React, { Component } from 'react';

import { List, ListItem } from 'material-ui'
import L from 'leaflet'

// using fuze http://fusejs.io/ 
// we can filter all sitenames using the fuzzy logic algorithm
let Fuse = require('fuse.js')

// an option object is required as parameter to fuze instance
const options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 50,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "id"
    ]
};

class SearchDrawer extends Component {

    // focus on the site in the map when the site item in the drawer is clicked
    handleFocus(site) {
        let coor = new L.latLng(site.lat, site.lng)
        window.leafletmap.leafletElement.setView(coor, 11)
    }

    render() {
        // sites contains all the site objects 
        // filter is the search string
        let { sites, filter } = this.props 

        // the result variable contains the filtered sites by fuze
        let fuse = new Fuse(sites, options)
        let result = fuse.search(filter)

        // map each result to a listItem 
        return (
            <List>
                {
                    result.map((s) => {
                        return(<ListItem key={s.id} onTouchTap={ ()=> this.handleFocus(s) }>{s.id}</ListItem>)
                    })
                }
            </List>
        );
    }
}

export default SearchDrawer;