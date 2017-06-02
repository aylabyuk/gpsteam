import React, { Component } from 'react';

// ui
import { AppBar, Paper, List, ListItem} from 'material-ui'

class RightPanel extends Component {
    render() {
        return (
            <div style={{width: this.props.dimensions.width, height: this.props.dimensions.height, overflowY: 'scroll', overflowX: 'hidden'}}>
                <List>
                    {
                        this.props.sites.map((s)=> {
                            return(
                                <div className='listitem'  key={s.id}>
                                    <ListItem primaryText={s.id} id={s.id} ref={s.id} />
                                </div>
                            )
                        })
                    }
                </List>
            </div>
        );
    }
}

export default RightPanel;