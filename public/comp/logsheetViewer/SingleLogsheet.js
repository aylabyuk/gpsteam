import React, { PureComponent } from 'react';
import Details from './Details'
import moment from 'moment'
import { connect } from 'react-redux'
import { toggleLogsheetViewerDrawer, reviewLogsheet, setLogsheetMode } from '../../actions/index'

// ui
import { AppBar, IconButton, Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator, IconMenu, MenuItem } from 'material-ui'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import Back from 'material-ui/svg-icons/navigation/arrow-back';
import NavigationClose  from 'material-ui/svg-icons/navigation/close';

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { SingleLogsheetQuery } from '../../gqlFiles/logsheetgql'

class SingleLogsheet extends PureComponent {
    render() {
        
        let { loading, singleLogsheet } = this.props.data
        let title = ''

        if(singleLogsheet) {
            let logdate = new Date(singleLogsheet.logsheet_date)
            title = singleLogsheet.site.name + ' - ' + moment(logdate).format('MM/DD/YYYY - dddd')
        }

        return (
            <div style={{ overflowY: 'hidden' }}>
                <AppBar titleStyle={{ fontSize: '20px' }} title={title} iconElementLeft={ <IconButton
                            onTouchTap={() => this.props.handleChange(1, null) } >
                                <Back />
                        </IconButton> } 
                        iconElementRight={ <IconButton onTouchTap={()=> this.props.toggleLogsheetViewerDrawer()}><NavigationClose /></IconButton> }/>
                    <Details reviewLogsheet={this.props.reviewLogsheet} setLogsheetMode={this.props.setLogsheetMode} toggleDrawer={this.props.toggleLogsheetViewerDrawer} data={singleLogsheet} loading={loading}/>
            </div>
        );
    }
}

export default connect( null, { toggleLogsheetViewerDrawer, reviewLogsheet, setLogsheetMode })(graphql(SingleLogsheetQuery, {
  options: ({ currentLogsheet }) => ({ variables: { currentLogsheet } }),
})(SingleLogsheet));