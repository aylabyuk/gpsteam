import React, { Component } from 'react';
import { Field } from 'redux-form'
import { reduxForm, reset } from 'redux-form'
import { validateStaffInfo as validate } from '../formValidators/formValidators'
import SelectedStaffs from './SelectedStaffs'
import { cloneDeep, sortBy } from 'lodash'

//component
import StaffList from './StaffList'

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

//ui
import { Paper, AppBar, TextField, AutoComplete, Drawer, 
        FlatButton, RaisedButton, List, ListItem, DatePicker, Snackbar, LinearProgress, Tab, Tabs, GridList } from 'material-ui';
import MultipleForm from './MultipleForm'
import SwipeableViews from 'react-swipeable-views';

const styles = {
  gridList: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  paper: {
    width: 'auto',
    height: 'auto',
    padding: 8
  }
};

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField 
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    fullWidth={true}
  />
)

const renderAutoCompleteField = ({ input, label, dataSource, meta: { touched, error } }) => (
    <AutoComplete
        errorText = {touched && error} 
        floatingLabelText={label}
        filter={AutoComplete.caseInsensitiveFilter}
        openOnFocus={true}
        dataSource={dataSource}
        listStyle={{ maxHeight: 200, overflow: 'auto' }}
        onUpdateInput={input.onChange}
        searchText={input.value}
        maxSearchResults={10}
        openOnFocus={true}
        fullWidth={true}
    />
)

const renderDatePicker = ({ input, label, defaultValue, meta: { touched, error } }) => (
    <DatePicker 
        mode='portrait'
        errorText = {touched && error} 
        {...input}
        value = {input.value !== ''? new Date(input.value) : null}
        formatDate={new Intl.DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
        }).format}
        hintText={label}
        floatingLabelText={label}
        onChange = {(event, value) => {input.onChange(value)} } 
        onBlur = {(value) => { value = '' }}
        fullWidth={true}/>
)

const style = {
  margin: 0,
  display: 'block',
  padding: 0
};

// created staff information subscription
const staffCreated = gql`
  subscription staffCreated {
    staffCreated {
        id
        first_name
        last_name
        nickname
        position {
            id
            position_name
        }
        division {
            id
            division_name
        }
        contact_numbers {
            id
            number
        }
        emails {
            id
            address
        }
        office_location
        birthday
    }
  }
`;

// mutation for adding new staff
const addNewStaff = gql`
    mutation addNewStaff(
        $first_name: String!
        $last_name: String!
        $nickname: String!
        $positionId: Int!
        $divisionId: Int!
        $office_location: String!
        $birthday: Date!
        $contact_numbers: [ContactNumberInput]
        $emails: [EmailInput]
    ) {
        newStaff: createStaff( input: {
            first_name: $first_name
            last_name: $last_name
            nickname: $nickname
            positionId: $positionId
            divisionId: $divisionId
            office_location: $office_location
            birthday: $birthday
            contact_numbers: $contact_numbers
            emails: $emails
       } ) {
            id
            first_name
            last_name
        }
    }
`
// querying all staff/position/division
const StaffQuery = gql`query StaffQuery {
  allPosition {
    id
    position_name
  }
  allDivision{
    id
    division_name
  }
  allStaff(order: "first_name") {
    id
	first_name
    last_name
    nickname
    position {
      id
      position_name
    }
    division {
      id
      division_name
    }
    contact_numbers {
      id
      number
    }
    emails {
      id
      address
    }
    office_location
    birthday
  }
}`;

// This is the parent component for the staff list and the create new staff form
class StaffForm extends Component {
    constructor(props) {
        super(props);
        // since a swipeable container is used in this component we will create a slideIndex state and initialize it to 0
        // the swipeable container will keep track of the slideIndex value.  
        this.state = {
            slideIndex: 0, 
            openSnackBar: false,
            snackBarMsg: ''
        };
    }

    // sets the value for the slideIndex state
    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    // opens the snackbar with proper notification or error messages
    handleToggleSnackBar(msg) {
        this.setState({
            snackBarMsg: msg,
            openSnackBar: !this.state.openSnackBar
        });
    }

    // this will request the snackbar be out of the view
    handleRequestClose = () => {
        this.setState({
            openSnackBar: false,
            snackBarMsg: ''
        });
    };

    // reset the form. remove all values from the fields
    handleReset() {
        this.props.dispatch(reset('newStaff'));
    }

    handleSubmitStaff(d) {
        // get the position and division id
        let pos = this.props.data.allPosition.find((x) => x.position_name == d.positionName)
        let div = this.props.data.allDivision.find((x) => x.division_name == d.divisionName)

        // Before submitting all emails and contacts will be stored into an array
        // if data is not available, do nothing (null)
        let emails = [], contacts = []
        d.email1 ? emails.push({address: d.email1}) : null
        d.email2 ? emails.push({address: d.email2}) : null
        d.email3 ? emails.push({address: d.email3}) : null
        d.contactnumber1 ? contacts.push({number: d.contactnumber1}) : null
        d.contactnumber2 ? contacts.push({number: d.contactnumber2}) : null
        d.contactnumber3 ? contacts.push({number: d.contactnumber3}) : null

        // perform mutation using the variables from the fields
        this.props.mutate({ variables: {
            first_name: d.firstName,
            last_name: d.lastName,
            nickname: d.nickName,
            positionId: pos.id,
            divisionId: div.id,
            office_location: d.officeLocation,
            birthday: d.birthday,
            emails: emails,
            contact_numbers: contacts
        } }).then((data) => {
            let d = data.data.newStaff
            console.log('got new staff data', d);
            let msg = 'New Staff Created: ' + d.first_name + ' ' + d.last_name

            // when successfully saved, go to new staff 
            this.handleChange(0)
            
            //toggle snackbar and reset the fields
            this.handleToggleSnackBar(msg)
            this.handleReset()
        }).catch((error) => {
            // issue an error message to the snackbar on the error event
            console.log('there was an error sending the query: ', error);
            let msg = 'an error has occured'
            this.handleToggleSnackBar(msg)
        });

    }

    // this will handle the subscription of staff data
    // when new data comes we will make a clone of the previous data using cloneDeep from lodash and then push the new data to the result.
    // the newResult is an array of objects that will be returned and replace the data prop of the StaffForm component
    // for more info about subscription see: http://dev.apollodata.com/react/subscriptions.html
    componentWillReceiveProps(nextProps) {
        if (!this.subscription && !nextProps.data.loading) {
            let { subscribeToMore } = this.props.data
            this.subscription = [
                subscribeToMore({
                    document: staffCreated,
                    updateQuery: (previousResult, { subscriptionData }) => {

                        const newContact = subscriptionData.data.staffCreated
                        const newResult = cloneDeep(previousResult)
                        
                        newResult.allStaff.push(subscriptionData.data.staffCreated)

                        //console.log(newResult)
                        return newResult
                    },
                })
            ]
        }
    }

    // when props or state updates such as new staff data comes in
    // issue a resize event to the ui just to refresh the view layer
    componentDidUpdate(prevProps, prevState) {
        window.dispatchEvent(new Event('resize'));
    }
    
    render() {
        // get the nessesary data props
        // values for these are only available after successful queries
        let { loading, allPosition, allDivision, allStaff } = this.props.data

        // when loading is still true render a progress bar
        // if false render the component
        if(loading) {
            return <LinearProgress mode="indeterminate" />
        } else {
            // Swipeable patterns is copied from the material-ui docs about "tabs"
            // http://www.material-ui.com/#/components/tabs see example for Tabs with slide effect (react-swipeable-views)
            return (
                <div>
                    <Paper style={style} zDepth={1}>

                         <AppBar title="Manage Staffs" />
                         
                         {/*  */}
                         <Tabs
                            onChange={this.handleChange}
                            value={this.state.slideIndex} >
                            <Tab label="List" value={0} />
                            <Tab label="Create New" value={1} />
                        </Tabs>

                        <SwipeableViews
                            index={this.state.slideIndex}
                            onChangeIndex={this.handleChange}>

                            <GridList
                                cellHeight={window.innerHeight * 0.6}
                                cols={1}
                                style={styles.gridList} 
                                id="style-5" >
                                {/* render the list here and supply all the staff data to the StaffList component*/}
                                <StaffList data={this.props.data} id='stafflist'/>
                            </GridList>

                            <GridList
                                cellHeight={window.innerHeight * 0.6}
                                cols={1}
                                style={styles.gridList} >
                                <div style={{padding: '5px'}}>
                                    <Field name='firstName' label="first name" component={renderTextField}  />
                                    <Field name='lastName' label="last name" component={renderTextField}  />
                                    <Field name='nickName' label="nick name" component={renderTextField}  />
                                    <Field name='birthday' label="birthday" component={renderDatePicker} autoOk={false}/>
                                    <Field name='positionName' label="position" component={renderAutoCompleteField}  dataSource={allPosition.map((a) => { return a.position_name }) } />
                                    <Field name='divisionName' label="division" component={renderAutoCompleteField}  dataSource={allDivision.map((a) => { return a.division_name }) } />
                                    <Field name='officeLocation' label="office location" component={renderTextField}  />
                                    <MultipleForm name='email' />
                                    <MultipleForm name='contactnumber' />
                                    <RaisedButton label="Add" primary fullWidth onTouchTap={this.props.handleSubmit(this.handleSubmitStaff.bind(this))}/>
                                </div>
                            </GridList>

                        </SwipeableViews>

                        {/* This snackbar is hidden, only becomes visible when openSnackBar state is set to true */}
                        <Snackbar
                            open={this.state.openSnackBar}
                            message={this.state.snackBarMsg}
                            autoHideDuration={4000}
                            onRequestClose={this.handleRequestClose}
                        />
                    </Paper>
                </div>
            );
        }
    }
}

// set the name of the redux form to 'newStaff and
// set the validation module for field validation
const form =  reduxForm({
	form: 'newStaff',
    validate
})

// exporting the component with graphql HOC
export default graphql(addNewStaff)(graphql(StaffQuery)(form(StaffForm)));