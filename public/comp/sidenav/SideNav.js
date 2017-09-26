import React from 'react';
import { AppBar, Paper, List, ListItem, Divider, Drawer, Avatar  } from 'material-ui'
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionDescription from 'material-ui/svg-icons/action/description';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import MapsPlace from 'material-ui/svg-icons/maps/place'
import MapsSatellite from 'material-ui/svg-icons/maps/satellite'

import { deepOrange300, blue700 } from 'material-ui/styles/colors';
  

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
                    <Drawer width={280} open={this.state.leftDrawer} docked={false} onRequestChange={()=> this.handleCloseSideNav()}>                    
                        <Paper>
                            <List style={{ paddingTop: '0px' }}>
                                <ListItem className='mybg' leftAvatar={<Avatar color={blue700} backgroundColor={deepOrange300} >OA</Avatar>} 
                                    primaryText={this.props.me.username} secondaryText={this.props.me.email}/>  
                                <Divider/>
                                <ListItem leftIcon={<MapsPlace/>}>Dashboard</ListItem>
                                <ListItem leftIcon={<ActionDescription/>}>Logsheets</ListItem>
                                <ListItem leftIcon={<MapsSatellite/>}>Timeseries</ListItem>
                                <Divider/>
                                <ListItem leftIcon={<ActionExitToApp/>}>Logout</ListItem>
                            </List>
                        </Paper>
                    </Drawer>
                </div>
            );
        }
    }

    return SideNav
}