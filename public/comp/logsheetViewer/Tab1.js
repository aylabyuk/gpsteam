import React, { Component } from 'react';

// ui
import { Table, TableBody, TableRowColumn, TableRow, TableHeaderColumn } from 'material-ui'

class Tab1 extends Component {
    render() {
        let { d } = this.props
        let dt = new Date(d.logsheet_date);
        return (
            <Table selectable={false} style={{marginLeft: '5px', marginRight: '5px', marginTop: '5px'}}>
                <TableBody displayRowCheckbox={false} >
                    <TableRow >
                        <TableHeaderColumn>id</TableHeaderColumn>
                        <TableRowColumn>{d.id}</TableRowColumn>
                    </TableRow>
                    <TableRow >
                        <TableHeaderColumn>site</TableHeaderColumn>
                        <TableRowColumn>{d.site.name}</TableRowColumn>
                    </TableRow>
                    <TableRow >
                        <TableHeaderColumn>marker</TableHeaderColumn>
                        <TableRowColumn>{d.marker}</TableRowColumn>
                    </TableRow>
                    <TableRow >
                        <TableHeaderColumn>location</TableHeaderColumn>
                        <TableRowColumn>{d.location}</TableRowColumn>
                    </TableRow>
                    <TableRow >
                        <TableHeaderColumn>type</TableHeaderColumn>
                        <TableRowColumn>{d.survey_type}</TableRowColumn>
                    </TableRow>
                    <TableRow >
                        <TableHeaderColumn>logsheet date</TableHeaderColumn>
                        <TableRowColumn>{ dt.toDateString() }</TableRowColumn>
                    </TableRow>
                    <TableRow >
                        <TableHeaderColumn>day of year</TableHeaderColumn>
                        <TableRowColumn>{d.julian_day}</TableRowColumn>
                    </TableRow>
                    <TableRow >
                        <TableHeaderColumn>observers</TableHeaderColumn>
                        <TableRowColumn>{
                            d.observers.map((o)=> {
                                return (<div key={Math.random()} style={{marginTop: '10px', marginBottom: '10px'}}>{o.first_name + ' ' + o.last_name}</div>) 
                            })    
                        }</TableRowColumn>
                    </TableRow>
                    <TableRow >
                        <TableHeaderColumn>receiver serial number</TableHeaderColumn>
                        <TableRowColumn>{d.receiver.serial_number}</TableRowColumn>
                    </TableRow>
                    <TableRow >
                        <TableHeaderColumn>antenna serial number</TableHeaderColumn>
                        <TableRowColumn>{d.antenna.serial_number}</TableRowColumn>
                    </TableRow>
                    {/*{d.contact.first_name ? <TableRow >
                        <TableHeaderColumn>contact person</TableHeaderColumn>
                        <TableRowColumn>{d.contact.first_name + ' ' + d.contact.last_name + ' / ' + d.contact.contact_number}</TableRowColumn>
                    </TableRow>: '' }*/}
                </TableBody>
            </Table>
        );
    }
}

export default Tab1;