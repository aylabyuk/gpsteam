import React from 'react'

// routing
import { Route, Switch } from 'react-router-dom'

// This module will handle the routing of the application
// Each routes are supplied with a component to render

// components
import MainDashboard from './comp/dashboard/MainDashboard'
import NotFoundPage from './comp/NotFoundPage'
import _Logsheet from './comp/logsheet/_LogSheet'
import TimeseriesContainer from './comp/timeseries/TimeseriesContainer'

const routes = () => {
    return(
        <div>
            <Switch>
            {/* the default path displays the MainDashboard component */}
            <Route exact path='/' component={MainDashboard} />
            <Route path='/logsheet' component={_Logsheet} />
            <Route path='/timeseries' component={TimeseriesContainer} />

            {/* when the path is not found or (404) display the notfoundpage */}
            <Route component={NotFoundPage} />
            </Switch>
        </div>
    )
}

export default routes