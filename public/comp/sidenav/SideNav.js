import React from 'react';
import { AppBar, Paper, List, ListItem, Divider, Drawer  } from 'material-ui'
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import { Link } from 'react-router-dom'

export function sideNav(Component) {

    class SideNav extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                leftDrawer: false
            };
            this.handleOpenSideNav = this.handleOpenSideNav.bind(this);
        }

        handleOpenSideNav() {
            this.setState({leftDrawer: true})
        }

        handleCloseSideNav() {
            this.setState({leftDrawer: false})
        } 

        render() {
            return (
                <div>
                    <Component openSideNav={this.handleOpenSideNav}  {...this.props} me={this.props.me} />
                    <Drawer width={280} open={this.state.leftDrawer} >                    
                        <AppBar 
                        className='mybg'
                        showMenuIconButton={false}
                        iconElementRight={<IconButton onTouchTap={()=> this.handleCloseSideNav()}><NavigationClose /></IconButton>}
                        style={{height: '200px'}}/>
                            <Paper>
                                <List>
                                    <ListItem>Dashboard</ListItem>
                                    <ListItem>Logsheets</ListItem>
                                    <ListItem>Timeseries</ListItem>
                                    <Divider/>
                                    <ListItem>Logout</ListItem>
                                </List>
                            </Paper>
                    </Drawer>
                </div>
            );
        }
    }

    return SideNav
}