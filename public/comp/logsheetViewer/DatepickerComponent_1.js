import React, { Component } from 'react';
import InfiniteCalendar, { Calendar, withRange  } from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { selectedTheme } from '../../MainComponent'

const CalendarWithRange = withRange(Calendar);

const theme = {
    accentColor: 'rgb(56, 87, 138, 0.94)',
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

    setDates(dates) {

        if(dates.eventType !== 3) {
            return null
        }

        this.setState({
            startDate: dates.start,
            endDate: dates.end
        })
    }

    render() {
        let  { startDate, endDate } = this.state

        return (
            <InfiniteCalendar
                onSelect={(dates) => this.setDates(dates) }
                Component={CalendarWithRange}
                width={400}
                height={400}
                selected={{
                    start: startDate ? startDate : new Date(),
                    end: endDate ? endDate : new Date(),
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