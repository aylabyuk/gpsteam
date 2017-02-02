import React from 'react'
import '../semantic/dist/semantic.min.css'

class MainComponent extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
            <div>
                {React.cloneElement(this.props.children, this.props)}
            </div>
		)
	}
}

export default MainComponent