import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment'

import { TextField, IconButton, FlatButton, IconMenu, MenuItem  } from 'material-ui'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert'

import 'react-datepicker/dist/react-datepicker.css';

class DatepickerComponent extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          startDate: moment(),
          endDate: moment()
        };

        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
    }
    
    handleChangeStart (date) {
        if(date > this.state.endDate) {
            this.setState({ startDate: this.state.endDate, endDate: date  });
        } else {
            this.setState({ startDate: date  });
        }
    }

    handleChangeEnd(date) {
        if(date < this.state.startDate) {
            this.setState({ endDate: this.state.startDate, startDate: date  });
        } else {
            this.setState({ endDate: date  });
        }
    }

    handleDeleteDates() {
        this.setState({ startDate: null, endDate: null  })
    }

    handleSelectRange(term){
        
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
            <div style={{display: 'flex', flexDirection: 'column' }} >
                <div style={{display: 'flex' }}>
                    <DatePicker
                        customInput={<TextField floatingLabelText='start date' style={{ width: '100px' }}/>}
                        showYearDropdown
                        showMonthDropdown
                        maxDate={moment()}
                        selected={this.state.startDate}
                        selectsStart
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeStart}
                    />
                    
                    <h4 style={{ margin: '41px 10px 0px 10px' }}> - </h4>

                    <DatePicker
                        customInput={<TextField floatingLabelText='end date' style={{ width: '100px' }}/>}
                        showYearDropdown
                        showMonthDropdown
                        maxDate={moment()}
                        selected={this.state.endDate}
                        selectsEnd
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeEnd}
                    />

                    <div style={{ margin: '25px 10px' }}>
                        <IconButton onTouchTap={() => this.handleDeleteDates()}>
                            <ActionDelete />
                        </IconButton>
                        <IconMenu
                        iconButtonElement={<IconButton><NavigationMoreVert /></IconButton>}
                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        >
                            <MenuItem onTouchTap={() => this.handleSelectRange(0) }  primaryText="Today" />
                            <MenuItem onTouchTap={() => this.handleSelectRange(1) }  primaryText="Yesterday" />
                            <MenuItem onTouchTap={() => this.handleSelectRange(2) }  primaryText="Last 7 Days" />
                            <MenuItem onTouchTap={() => this.handleSelectRange(3) }  primaryText="Last 30 Days" />
                            <MenuItem onTouchTap={() => this.handleSelectRange(4) }  primaryText="This Month" />
                            <MenuItem onTouchTap={() => this.handleSelectRange(5) }  primaryText="Last Month" />
                            <MenuItem onTouchTap={() => this.handleSelectRange(6) }  primaryText="This Year" />
                            <MenuItem onTouchTap={() => this.handleSelectRange(7) }  primaryText="Last Year" />
                        </IconMenu>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default DatepickerComponent;