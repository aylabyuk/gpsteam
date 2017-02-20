import React from 'react'
import '../semantic/dist/semantic.min.css'

//ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class MainComponent extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
            <MuiThemeProvider>
                {React.cloneElement(this.props.children, this.props)}
            </MuiThemeProvider>
		)
	}
}

export default MainComponent