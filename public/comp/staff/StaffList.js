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

// using the props passed from StaffForm component we can render all staff information using StaffList component
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

        // arrange initials alphabetically
        let mstaffData = []
        data.allStaff.map((d) => { mstaffData.push(d) });
        let staffData = mstaffData.sort((a,b) => {
            let initialsA = a.first_name.charAt(0) + a.last_name.charAt(0)
            let initialsB = b.first_name.charAt(0) + b.last_name.charAt(0)

            if (initialsA < initialsB)
                return -1;
            if (initialsA > initialsB)
                return 1;
            return 0;
        })

        return (
            <List >
            { staffData.map((d) => {
                let fullname = d.first_name + ' ' + d.last_name
               
                let initials = d.first_name.charAt(0) + d.last_name.charAt(0)

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
                            > { initials }</Avatar>
                        }
                        primaryText={ d.first_name + ' ' + d.last_name + ' (' + d.position.position_name + '/' + d.division.division_name + ')' }
                        id= { d.id }
                        key={ d.id }
                        onTouchTap={()=> this.handleSelected(d.id, d.nickname, initials)}
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