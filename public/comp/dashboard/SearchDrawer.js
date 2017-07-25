import React, { Component } from 'react';

import { List, ListItem } from 'material-ui'

let Fuse = require('fuse.js')

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
    render() {
        let { sites, filter } = this.props 
        let fuse = new Fuse(sites, options)
        let result = fuse.search(filter)

        return (
            <List>
                {
                    result.map((s) => {
                        return(<ListItem key={s.id}>{s.id}</ListItem>)
                    })
                }
            </List>
        );
    }
}

export default SearchDrawer;