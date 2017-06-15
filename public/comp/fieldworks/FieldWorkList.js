import React, { PureComponent } from 'react';

// ui
import { List, ListItem } from 'material-ui'

class FieldWorkList extends PureComponent {
    render() {
        return (
            <List>
                <ListItem primaryText='fieldwork1' />
            </List>
        );
    }
}

export default FieldWorkList;