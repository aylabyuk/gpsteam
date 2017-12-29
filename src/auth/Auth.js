import React, { Component } from 'react'
import Register from './register/Register'
import Login from './login/Login'
import { client } from '../index'
import { meQuery } from './requireAuth'
import { Redirect  } from 'react-router-dom'

const style = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        position: 'fixed',
        padding:0,
        margin:0,
    }
}

class Auth extends Component {
    state = {
        openDialog: false,
        loggedIn: false
    };

    componentWillMount() {
        client.query({ query: meQuery}).then((res) => {
            if(res.data.me.id) {
                console.info('already logged in as ' + res.data.me.username + ' redirecting to main page...')
                this.setState({loggedIn: true})
            } else {
                this.setState({loggedIn: false})
            }
        })
    }

    handleClickOpen = () => {
        this.setState({ openDialog: true });
    };

    handleClose = () => {
        this.setState({ openDialog: false });
    };

    render() {
        if(this.state.loggedIn) {
            return(<Redirect to='/' />)
        }

        return (
            <div>
                <div className='bg' style={style.container} >
                    <Login registerFirst={this.handleClickOpen}/>
                </div>
                <Register open={this.state.openDialog} handleClose={this.handleClose}/>
            </div>

        )
    }
}

export default Auth