import React, { PureComponent } from 'react';
import moment from 'moment'

// ui
import { Table, TableBody, TableRowColumn, TableRow, TableHeaderColumn } from 'material-ui'

const s = {
    marginTop: '10px',
    marginBottom: '10px'
}

class Tab1 extends PureComponent {
    render() {
        let { d } = this.props
        let dt = new Date(d.logsheet_date);
        return (
            <Table selectable={false} style={{marginLeft: '5px', marginRight: '5px', marginTop: '5px'}}>
                <TableBody displayRowCheckbox={false} >
                    <TableRow >
                        <TableHeaderColumn>marker</TableHeaderColumn>
                        <TableRowColumn>{d.marker}</TableRowColumn>
                    </TableRow>
                    <TableRow >
                        <TableHeaderColumn>type</TableHeaderColumn>
                        <TableRowColumn>{d.survey_type}</TableRowColumn>
                    </TableRow>
                    <TableRow >
                        <TableHeaderColumn>location</TableHeaderColumn>
                        <TableRowColumn>{d.location}</TableRowColumn>
                    </TableRow>
                    <TableRow >
                        <TableHeaderColumn>day of year</TableHeaderColumn>
                        <TableRowColumn>{d.julian_day}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>measurements</TableHeaderColumn>
                        <TableRowColumn>
                            <div>
                                <div style={s}><strong>N: </strong>{d.north}</div>
                                <div style={s}><strong>E: </strong>{d.east}</div>
                                <div style={s}><strong>S: </strong>{d.south}</div>
                                <div style={s}><strong>W: </strong>{d.west}</div>
                                <div style={s}><strong>average: </strong>{d.avg_slant_height}</div>
                            </div>
                        </TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>time logs</TableHeaderColumn>
                        <TableRowColumn>
                            <div>
                                <div style={s}><strong>start time: </strong>{d.time_start ? moment(new Date(d.time_start)).format('HH:mm'): ''}</div>
                                <div style={s}><strong>end time: </strong>{d.time_end ? moment(new Date(d.time_end)).format('HH:mm') : ''}</div>
                            </div>
                        </TableRowColumn>
                    </TableRow>
                    <TableRow >
                        <TableHeaderColumn>receiver</TableHeaderColumn>
                        <TableRowColumn>{
                            <div>
                                <div style={s}><strong>SN: </strong>{d.receiver.serial_number}</div>
                                <div style={s}><strong>PN: </strong>{d.receiver.part_number}</div>
                            </div>
                        }</TableRowColumn>
                    </TableRow>
                    <TableRow >
                        <TableHeaderColumn>antenna</TableHeaderColumn>
                        <TableRowColumn>
                            <div>
                                <div style={s}><strong>SN: </strong>{d.antenna.serial_number}</div>
                                <div style={s}><strong>PN: </strong>{d.antenna.part_number}</div>
                            </div>
                        </TableRowColumn>
                    </TableRow>
                    <TableRow >
                        <TableHeaderColumn>observers</TableHeaderColumn>
                        <TableRowColumn>{
                            d.observers.map((o, index)=> {
                                return (<div key={index} style={s}>{o.first_name + ' ' + o.last_name}</div>) 
                            })    
                        }</TableRowColumn>
                    </TableRow>
                    
                </TableBody>
            </Table>
        );
    }
}

export default Tab1;