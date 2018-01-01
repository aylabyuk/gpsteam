import React, { Component } from 'react';
import { Drawer } from 'material-ui'

class MapSideBar extends Component {  
    render() {
        const { toggleDrawer, open } = this.props 

        return (
            <Drawer anchor="right" open={open} type='persistent'
                ModalProps={{
                    disableBackdrop: true
                }}
            >
                <div
                    tabIndex={0}
                    role="button"
                    onClick={toggleDrawer}
                    onKeyDown={toggleDrawer}
                >
                I am a sidebar..............///////////////////
                </div>
            </Drawer>
        );
    }
}

export default MapSideBar;