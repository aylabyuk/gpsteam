import React, { Component } from 'react';

const hoverStyle = 'circleBase hovered'
const defaultStyle = 'circleBase normal'


class Marker extends Component {
    render() {
        const style = this.props.$hover ? defaultStyle : defaultStyle;
        // console.log(this.props)
        return (
            <div>
                <div className='hoveredtext' style={{visibility: this.props.$hover ? 'visible' : 'hidden'}}>
                    {this.props.sitename}
                </div>
                <div className={style} />
            </div>
        );
    }
}

export default Marker;