import React, {Component} from 'react'
import { Link } from 'react-router'
import { Button, Segment, Input, Icon } from 'semantic-ui-react'

class Login extends Component {
	render() {
		return (
            <div id='container' >
                <Segment.Group compact id='card'>
                    <Segment padded>
                        <center><h1>ATTEND</h1></center>
                    </Segment>
					<Segment padded id='inputsLogin'>
						<Input placeholder="Username" />
						<Input  icon={<Icon name='help' inverted circular link color='blue' onClick={ () => { window.alert('presto!')}} />} placeholder="Password" type='Password' />			
						<Button color='blue'>
							Log in
						</Button>
					</Segment>
                    <Segment padded>
                        <em >Dont have an account?&nbsp;<Link to='/'>Sign up</Link></em>
                    </Segment>
                </Segment.Group>
            </div>
		)
	}
}

export default Login