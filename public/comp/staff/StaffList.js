import React, { Component } from 'react';
import { cloneDeep, sortBy } from 'lodash'
import { connect } from 'react-redux'
import { changeSelectedStaffs } from '../../actions/index'

//ui
import { List, ListItem, Avatar } from 'material-ui';
import {fullWhite, transparent, grey500, indigo400} from 'material-ui/styles/colors';

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class StaffList extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedStaffs: this.props.selectedStaffsGlobal};
    }

    handleSelected(id, nname, initials) {
        var newArray = this.state.selectedStaffs
        var i = newArray.findIndex(x => x.id==id)
        if(i != -1) {
            newArray.splice(i, 1);
        } else {
            newArray.push({ id, nname, initials })
        }
        this.setState({ selectedStaffs: newArray })
        this.props.changeSelectedStaffs(newArray)
    }

    render() {
        let { data } = this.props

        return (
            <List>
            { data.allStaff.map((d) => {
                let fullname = d.first_name + ' ' + d.last_name
               
                let firstChar = d.first_name.charAt(0)
                let secondChar = d.last_name.charAt(0)

                return (
                    <ListItem
                        leftAvatar={
                            <Avatar
                                color={fullWhite} 
                                backgroundColor={
                                    this.state.selectedStaffs.findIndex(x => x.id==d.id) != -1 ? 
                                    indigo400 : grey500
                                }
                                style={{left: 8}}
                            > { firstChar + secondChar } </Avatar>
                        }
                        primaryText={ d.first_name + ' ' + d.last_name + ' (' + d.position.position_name + '/' + d.division.division_name + ')' }
                        id= { d.id }
                        key={ d.id }
                        onTouchTap={()=> this.handleSelected(d.id, d.nickname, firstChar + secondChar)}
                    />
                )
            }) }

            </List>
        );
    }
}

function mapStateToProps(state) {  
	return {
		selectedStaffsGlobal: state.ui.selectedStaffs
	}
}

export default connect(mapStateToProps, { changeSelectedStaffs })(StaffList);