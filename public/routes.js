import React from 'react'

// routing
import { Route, Switch } from 'react-router-dom'

// components
import MainDashboard from './comp/dashboard/MainDashboard'
import NotFoundPage from './comp/NotFoundPage'
import _Logsheet from './comp/logsheet/_LogSheet'
import TimeseriesContainer from './comp/timeseries/TimeseriesContainer'

const routes = () => {
    return(
        <div>
            <Switch>
            <Route exact path='/' component={MainDashboard} />
            <Route path='/logsheet' component={_Logsheet} />
            <Route path='/timeseries' component={TimeseriesContainer} />

            <Route component={NotFoundPage} />
            </Switch>
        </div>
    )
}

export default routes