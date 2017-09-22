import React from 'react'
import purple from './themes/purple'

//ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// routing
import { BrowserRouter } from 'react-router-dom'

// MainComponent is another 
// MuiThemeProvider is used by material-ui to provide styling and dynamics to all the material-ui components
// BrowserRouter will be used by react-router to map the user's path to each component

class MainComponent extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<MuiThemeProvider muiTheme={purple()}>
				<BrowserRouter >
					{this.props.routes}
				</BrowserRouter>
			</MuiThemeProvider>
		)
	}
}

export default MainComponent