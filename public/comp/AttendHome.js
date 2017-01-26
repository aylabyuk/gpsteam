import React, {Component} from 'react'
import { Link } from 'react-router'
import { Button, Icon, Segment, Input, Divider} from 'semantic-ui-react'
import SignUpInputs from './SignUpInputs'

require('../css/home.css')

class AttendHome extends Component {
	render() {
		return (
            <div id='container' >
                <Segment.Group compact id='card'>
                    <Segment padded>
                        <center><h1>ATTEND</h1><p color='red'>Sign up to start managing your unit.</p></center>
                    </Segment>
                    <Segment padded>
                        <Button color='facebook'>
                            <Icon name='facebook'/> connect using facebook
                        </Button>
                        <Divider horizontal ><em>Or</em></Divider>
                        <SignUpInputs />
                        
                    </Segment>
                    <Segment padded>
                        <em >Already have an account?&nbsp;<Link to='/login'>Log in</Link></em>
                    </Segment>
                </Segment.Group>
            </div>
		)
	}
}

export default AttendHome