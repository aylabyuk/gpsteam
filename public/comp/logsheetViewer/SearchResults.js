import React, { Component } from 'react';

import { Paper  } from 'material-ui'

const paperStyle = {
 width: '100px',
 height: '100px',
 padding: '10px',
 margin: '10px'
}

class SearchResults extends Component {
    render() {
        return (
            <Paper style={{ display: 'flex', flexWrap: 'wrap', padding: '10px', maxWidth: '800px', justifyContent: 'flex-start' }}>
                <Paper style={paperStyle}>test</Paper>
                <Paper style={paperStyle}>test</Paper>
                <Paper style={paperStyle}>test</Paper>
                <Paper style={paperStyle}>test</Paper>
                <Paper style={paperStyle}>test</Paper>
                <Paper style={paperStyle}>test</Paper>
                <Paper style={paperStyle}>test</Paper>
                <Paper style={paperStyle}>test</Paper>
                <Paper style={paperStyle}>test</Paper>
                <Paper style={paperStyle}>test</Paper>
            </Paper>
        );
    }
}

export default SearchResults;