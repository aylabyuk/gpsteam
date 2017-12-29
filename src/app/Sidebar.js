import React, { Component } from 'react'

import {
    Drawer,
    Hidden,
    Divider
} from 'material-ui'

import NavList from './NavList'

export default class Sidebar extends Component {
    render() {
        const { classes, handleDrawerToggle, theme, mobileOpen } = this.props


        const drawer = (
            <div>
                <div className={classes.drawerHeader} />
                <Divider />
                <NavList />
            </div>
        );

        return (
            <div>
                <Hidden mdUp>
                    <Drawer
                        type="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}>
                    {drawer}
                    </Drawer>
                </Hidden>
                <Hidden mdDown implementation="css">
                    <Drawer
                        type="permanent"
                        open
                        classes={{
                            paper: classes.drawerPaper,
                        }}>
                    {drawer}
                    </Drawer>
                </Hidden>
            </div>
        )
    }
}
