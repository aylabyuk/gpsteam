import React, { Component } from 'react';

// ui
import { CircularProgress } from 'material-ui'
import JSONTree from 'react-json-tree'

const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633'
};


class Details extends Component {
    render() {
        let { data, loading } = this.props

        if(loading || !data) {
            return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '600px' }}>
                    <CircularProgress 
                        style={{ maxWidth: '50%' }}
                        size={60}
                        thickness={5}
                    />
                </div>
            );
        } else {
            console.log(data)

            return (
                <JSONTree data={ data } theme={ theme }/>
            );
        }
    }
}

export default Details;