import React, { Component } from 'react'
import {
    AppBar,
    Toolbar,
    Typography
} from 'material-ui'

import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

class Header extends Component {
    render() {
        const { classes, handleDrawerToggle } = this.props
        return (
            <AppBar className={classes.appBar}>
                <Toolbar>
                <IconButton
                    color="contrast"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    className={classes.navIconHide}>

                    <MenuIcon />
                </IconButton>
                <Typography type="title" color="inherit" noWrap>
                    GPS Dashboard
                </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Header