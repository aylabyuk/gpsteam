import React, { Component } from 'react'
import Typography from 'material-ui/Typography';
import { Route } from 'react-router-dom'

import Map from '../map/MapContainer'
import Sites from '../sites/Sites'
import Logsheets from '../logsheets/Logsheets'
import Users from '../users/Users'
import Equipments from '../equipments/Equipments'

export default class Contents extends Component {
    render() {
        const { classes } = this.props

        return (
            <main className={classes.content}>
                <Route path='/dash/map' component={Map} />
                <Route path='/dash/sites' component={Sites} />
                <Route path='/dash/logsheets' component={Logsheets} />
                <Route path='/dash/equipments' component={Equipments} />
                <Route path='/dash/users' component={Users} />

                <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
            </main>
        )
    }
}
