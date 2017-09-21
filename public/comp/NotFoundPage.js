import React, {PureComponent} from 'react'

import { Paper } from 'material-ui'
import styles from '../css/bg.css'


// set the styling for this component
const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    width: '30em',
    height: '18em',
    marginTtop: '-9em',
    marginLeft: '-15em',
    padding: '10px',
    textAlign: 'center',
    backgroundImage: 'url(http://i.imgur.com/AMf9X7E.jpg)',
    backgroundSize: 'cover'
}

// NotFoundPage is rendered whenever a url returns 404 
class NotFoundPage extends PureComponent {
	render() {
		return (
            <div className='mybg' style={{ padding: 0, height: '100vh'}}>
            <Paper style={style}>
                <h2>{this.props.location.pathname}</h2>
                <h1>404 - Page Not Found</h1>
                <h3>I'm sorry, the page you were looking for cannot be found!</h3>
            </Paper>
            </div>
		)
	}
}

export default NotFoundPage