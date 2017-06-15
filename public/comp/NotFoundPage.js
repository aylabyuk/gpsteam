import React, {PureComponent} from 'react'

import { Paper } from 'material-ui'

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

class NotFoundPage extends PureComponent {
	render() {
		return (
            <Paper style={style}>
                <h2>{this.props.location.pathname}</h2>
                <h1>404 - Page Not Found</h1>
                <h3>I'm sorry, the page you were looking for cannot be found!</h3>
            </Paper>
		)
	}
}

export default NotFoundPage