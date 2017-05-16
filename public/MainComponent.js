import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

//ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// routing
import { BrowserRouter } from 'react-router-dom'

class MainComponent extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		console.log(this)
		return (
			<MuiThemeProvider>
				<BrowserRouter >
					{this.props.routes}
				</BrowserRouter>
			</MuiThemeProvider>
		)
	}
}

export default MainComponent