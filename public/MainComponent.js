import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

//ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import _Logsheet from './comp/logsheet/_Logsheet'

class MainComponent extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<MuiThemeProvider>
				{/*<_Logsheet />*/}
				{ console.log(this) }
                {React.cloneElement(this.props.children, this.props)}
            </MuiThemeProvider>
		)
	}
}

export default MainComponent