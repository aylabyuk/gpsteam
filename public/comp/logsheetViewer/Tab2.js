import React, { PureComponent } from 'react';

// ui
import { Table, TableBody, TableRowColumn, TableRow, TableHeaderColumn } from 'material-ui'

const s = {
    marginTop: '10px',
    marginBottom: '10px'
}

class Tab2 extends PureComponent {
    render() {
        let { d } = this.props
        return (
            <div style={{overflowY: 'scroll', height: '90%'}}>
            <Table selectable={false} style={{marginLeft: '5px', marginRight: '5px', marginTop: '5px'}}>
                <TableBody displayRowCheckbox={false} >
                    <TableRow>
                        <TableHeaderColumn>rod number</TableHeaderColumn>
                        <TableRowColumn>{d.rod_num}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>rod correction</TableHeaderColumn>
                        <TableRowColumn>{d.rod_correction}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>ip address</TableHeaderColumn>
                        <TableRowColumn>{d.ip_add}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>netmask</TableHeaderColumn>
                        <TableRowColumn>{d.netmask}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>gateway</TableHeaderColumn>
                        <TableRowColumn>{d.gateway}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>dns</TableHeaderColumn>
                        <TableRowColumn>{d.dns}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>local tcp port</TableHeaderColumn>
                        <TableRowColumn>{d.local_tcp_port}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>rough coordinate - latitude</TableHeaderColumn>
                        <TableRowColumn>{d.latitude}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>rough coordinate - longitude</TableHeaderColumn>
                        <TableRowColumn>{d.longitude}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>unusual/abnormal situation observed</TableHeaderColumn>
                        <TableRowColumn>{d.observed_situation}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>lodging or road information</TableHeaderColumn>
                        <TableRowColumn>{d.lodging_road_information}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>other pertinent information</TableHeaderColumn>
                        <TableRowColumn>{d.others}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>contact person</TableHeaderColumn>
                        <TableRowColumn>
                            {d.contact ? <div>
                                <div style={s}><strong>name: </strong>{d.contact.first_name + ' ' + d.contact.last_name}</div>
                                <div style={s}><strong>contact number: </strong>{d.contact.contact_number}</div>
                            </div> : <div>no record</div> }
                        </TableRowColumn>
                    </TableRow> 
                </TableBody>
            </Table>
            </div>
        );
    }
}

export default Tab2;