import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

//ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import _Logsheet from './comp/logsheet/_Logsheet'
import NotFoundPage from './comp/NotFoundPage'
import _Staff from './comp/staff/_Staff'

// routing
import { Link, Route, Router, BrowserRouter } from 'react-router-dom'

class MainComponent extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<MuiThemeProvider>
				<BrowserRouter>
					<div>
						<Route exact path='/' component={_Logsheet} />
						<Route path='/staff' component={_Staff} />
					</div>
				</BrowserRouter>
			</MuiThemeProvider>
		)
	}
}

export default MainComponent