import React, { Component } from 'react';
import InfiniteCalendar, { Calendar, withRange  } from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { selectedTheme } from '../../MainComponent'

const CalendarWithRange = withRange(Calendar);

const theme = {
    accentColor: selectedTheme.flatButton.secondaryTextColor,
    floatingNav: {
      background: 'rgba(56, 87, 138, 0.94)',
      chevron: '#FFA726',
      color: '#FFF',
    },
    headerColor: selectedTheme.appBar.color,
    selectionColor: selectedTheme.flatButton.primaryTextColor,
    textColor: {
      active: '#FFF',
      default: '#333',
    },
    todayColor: '#FFA726',
    weekdayColor: '#559FFF',
}

class DatepickerComponent extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          startDate: null,
          endDate: null
        };
    }

    render() {
        return (
            <InfiniteCalendar
                Component={CalendarWithRange}
                width={400}
                height={400}
                selected={{
                    start: new Date(),
                    end: new Date(),
                }}
                min={new Date(2005, 0, 1)}
                max={new Date()}
                locale={{
                    headerFormat: 'MMM Do',
                }}
                theme={theme}
            />
        );
    }
}

export default DatepickerComponent;