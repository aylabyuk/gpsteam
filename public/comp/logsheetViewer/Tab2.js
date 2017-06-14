import React, { Component } from 'react';
import moment from 'moment'

// ui
import { Table, TableBody, TableRowColumn, TableRow, TableHeaderColumn } from 'material-ui'

class Tab2 extends Component {
    render() {
        let { d } = this.props

        return (
            <Table selectable={false} style={{marginLeft: '5px', marginRight: '5px', marginTop: '5px'}}>
                <TableBody displayRowCheckbox={false} >
                    <TableRow>
                        <TableHeaderColumn>north</TableHeaderColumn>
                        <TableRowColumn>{d.north}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>east</TableHeaderColumn>
                        <TableRowColumn>{d.east}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>south</TableHeaderColumn>
                        <TableRowColumn>{d.south}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>west</TableHeaderColumn>
                        <TableRowColumn>{d.west}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>average slant height</TableHeaderColumn>
                        <TableRowColumn>{d.avg_slant_height}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>azimuth</TableHeaderColumn>
                        <TableRowColumn>{d.azimuth ? d.azimuth : ''}</TableRowColumn>
                    </TableRow> : '' }
                    <TableRow>
                        <TableHeaderColumn>start time</TableHeaderColumn>
                        <TableRowColumn>{d.time_end ? moment(new Date(d.time_start)).format('HH:mm'): ''}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>end time</TableHeaderColumn>
                        <TableRowColumn>{d.time_end ? moment(new Date(d.time_end)).format('HH:mm') : ''}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>failure time</TableHeaderColumn>
                        <TableRowColumn>{d.failure_time ? moment(new Date(d.failure_time)).format('HH:mm') : ''}</TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }
}

export default Tab2;