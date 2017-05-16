import React, {Component} from 'react'

const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    width: '30em',
    height: '18em',
    marginTtop: '-9em',
    marginLeft: '-15em',
    border: '20px solid #ccc',
    backgroundColor: '#f3f3f3',
}

class NotFoundPage extends Component {
	render() {
		return (
            <div style={style}>
                <code>{this.props.location.pathname}</code>
                <h1>404 - Page Not Found</h1>
                <h3>I'm sorry, the page you were looking for cannot be found!</h3>
            </div>
		)
	}
}

export default NotFoundPage