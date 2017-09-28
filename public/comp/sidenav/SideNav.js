import React from 'react';
import { AppBar, Paper, List, ListItem, Divider, Drawer, Avatar  } from 'material-ui'
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionDescription from 'material-ui/svg-icons/action/description';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import MapsPlace from 'material-ui/svg-icons/maps/place'
import MapsMap from 'material-ui/svg-icons/maps/map'
import MapsSatellite from 'material-ui/svg-icons/maps/satellite'
import SocialPerson from 'material-ui/svg-icons/social/person'

import { deepOrange300, blue700 } from 'material-ui/styles/colors';
  

import { withRouter } from 'react-router-dom'

class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leftDrawer: false
        };
        this.handleOpenSideNav = this.handleOpenSideNav.bind(this);
        this.handleNav = this.handleNav.bind(this);
    }

    handleOpenSideNav() {
        this.setState({leftDrawer: true})
    }

    handleCloseSideNav(cb) {
        this.setState({leftDrawer: false})

        if (typeof cb === "function") {
            cb()
        }
    }

    handleNav(path) {
        this.handleCloseSideNav(() => {
            this.props.history.push(path)
        }) 
    }

    handleLogout() {
        localStorage.clear()
        location.reload()
    }

    render() {
        let { pathname } =  this.props.location

        return (
            <div>
                <Drawer overlayClassName='mybg2' containerStyle={{zIndex: 1500}} overlayStyle={{zIndex: 1400}}  
                    width={280} open={this.state.leftDrawer} docked={false} onRequestChange={()=> this.handleCloseSideNav()}>                    
                    <Paper>
                        <List style={{ paddingTop: '0px' }}>
                            <ListItem className='mybg' leftAvatar={<Avatar color={blue700} icon={<SocialPerson />} backgroundColor={deepOrange300} />} 
                                primaryText={this.props.me.username} secondaryText={this.props.me.email}/>  
                            <Divider/>
                            <ListItem onTouchTap={()=> this.handleNav('/')} primaryText='Dashboard' style={{ color: pathname == '/' ? blue700 : null }} leftIcon={<MapsMap/>} />
                            <ListItem onTouchTap={()=> this.handleNav('/sites')} primaryText='Sites' style={{ color: pathname == '/sites' ? blue700 : null }} leftIcon={<MapsPlace/>} />
                            <ListItem onTouchTap={()=> this.handleNav('/logsheets')} primaryText='Logsheets' style={{ color: pathname == '/logsheets' ? blue700 : null }} leftIcon={<ActionDescription/>} />
                            <ListItem onTouchTap={()=> this.handleNav('/timeseries')} primaryText='Timeseries' style={{ color: pathname == '/timeseries' ? blue700 : null }} leftIcon={<MapsSatellite/>} />
                            <Divider/>
                            <ListItem onTouchTap={()=> this.handleLogout()} leftIcon={<ActionExitToApp/>}>Logout</ListItem>
                        </List>
                    </Paper>
                </Drawer>
            </div>
        );
    }
}

export default withRouter(SideNav)
