import React, { Component } from 'react';
import moment from 'moment'

// ui
import { DateRange } from 'react-date-range'
import { Paper, Drawer, FlatButton } from 'material-ui'
import { darkBlack, blueGrey100, white } from 'material-ui/styles/colors'

const theme = {
              DateRange      : {
                background   : '#ffffff'
              },
              Calendar       : {
                background   : 'transparent',
                color        : '#95a5a6',
              },
              MonthAndYear   : {
                background   : '#ffffff',
                color        : darkBlack
              },
              MonthButton    : {
                background   : blueGrey100
              },
              MonthArrowPrev : {
                borderRightColor : white,
              },
              MonthArrowNext : {
                borderLeftColor : white,
              },
              Weekday        : {
                background   : '#ffffff',
                color        : darkBlack
              },
              Day            : {
                transition   : 'transform .1s ease, box-shadow .1s ease, background .1s ease'
              },
              DaySelected    : {
                background   : '#0097A7'
              },
              DayActive    : {
                background   : '#0097A7',
                boxShadow    : 'none'
              },
              DayInRange     : {
                background   : '#26C6DA',
                color        : '#fff'
              },
              DayHover       : {
                background   : '#ffffff',
                color        : '#7f8c8d',
                transform    : 'scale(1.1) translateY(-10%)',
                boxShadow    : '0 2px 4px rgba(0, 0, 0, 0.4)'
              }
            }

class DateRangeComponent extends Component {
    constructor(props) {
    super(props);
    this.state = {
           startDate: null,
           endDate: null
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextState != this.state) {
            this.props.handleSelect(nextState)
            return true
        }
        return false
    }
    

    handleSelectRange(term){
        
        let { dateRange }= this

        switch (term) {
            case 0: this.setState({ startDate: moment(), endDate: moment() }); break;
            case 1: this.setState({ startDate: moment().subtract(1, 'days'), endDate: moment().subtract(1, 'days') }); break;
            case 2: this.setState({ startDate: moment().subtract(6, 'days'), endDate: moment() }); break;
            case 3: this.setState({ startDate: moment().subtract(29, 'days'), endDate: moment() }); break;
            case 4: this.setState({ startDate: moment().startOf('month'), endDate: moment() }); break;
            case 5: this.setState({ startDate: moment().subtract(1, 'month').startOf('month'), endDate: moment().subtract(1, 'month').endOf('month') }); break;
            case 6: this.setState({ startDate: moment().startOf('year'), endDate: moment() }); break;
            case 7: this.setState({ startDate: moment().subtract(1, 'year').startOf('year'), endDate: moment().subtract(1, 'year').endOf('year') }); break;
        }
    }

    render() {

        return (
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Paper>
                    <DateRange calendars={2} rangedCalendars={true}
                        onChange={this.props.handleSelect}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        theme={theme}
                        maxDate={moment()}
                        /> 
                </Paper>
                <Paper style={{display: 'flex', flexDirection: 'column', padding: '20 0 20 0', width: '150px', zIndex: '99999'}}>
                    <FlatButton fullWidth onTouchTap={() => this.handleSelectRange(0)}>Today</FlatButton>
                    <FlatButton fullWidth onTouchTap={() => this.handleSelectRange(1)}>Yesterday</FlatButton>
                    <FlatButton fullWidth onTouchTap={() => this.handleSelectRange(2)}>Last 7 Days</FlatButton>
                    <FlatButton fullWidth onTouchTap={() => this.handleSelectRange(3)}>Last 30 Days</FlatButton>
                    <FlatButton fullWidth onTouchTap={() => this.handleSelectRange(4)}>This Month</FlatButton>
                    <FlatButton fullWidth onTouchTap={() => this.handleSelectRange(5)}>Last Month</FlatButton>
                    <FlatButton fullWidth onTouchTap={() => this.handleSelectRange(6)}>This Year</FlatButton>
                    <FlatButton fullWidth onTouchTap={() => this.handleSelectRange(7)}>Last Year</FlatButton>
                </Paper>
            </div>
        );
    }
}

export default DateRangeComponent;