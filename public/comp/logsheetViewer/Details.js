import React, { PureComponent } from 'react';
import Tab1 from './Tab1'
import Tab2 from './Tab2'

// ui 
import { Tab, Tabs, CircularProgress, RaisedButton } from 'material-ui'
import SwipeableViews from 'react-swipeable-views'


class Details extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
        this.handleReviewBtn = this.handleReviewBtn.bind(this)
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    handleReviewBtn = (data) => {
        this.props.toggleDrawer()
        this.props.reviewLogsheet(data)
    }

    render() {
        let { data, loading } = this.props

        if(loading || !data) {
            return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '600px' }}>
                    <CircularProgress 
                        style={{ maxWidth: '50%' }}
                        size={60}
                        thickness={5}
                    />
                </div>
            );
        } else {
            return (
                <div>
                <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
                    <Tab label="details" value={0} />
                    <Tab label="others" value={1} />
                </Tabs>
                <SwipeableViews animateHeight containerStyle={{ height: '80vh'}} index={this.state.slideIndex} onChangeIndex={this.handleChange} >
                    <Tab1 d={data} />
                    <Tab2 d={data} />
                </SwipeableViews>
                <RaisedButton style={{ bottom: '20px' }}fullWidth secondary label='review this logsheet' onTouchTap={()=> this.handleReviewBtn(data) }/>
                </div>
            );
        }
    }
}

export default Details;