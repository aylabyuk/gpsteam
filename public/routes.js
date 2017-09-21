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
import AccountsForm from './comp/accounts/AccountsForm'

// redirect modules
import { requireAuthentication as auth }  from './comp/accounts/requireAuth'

const routes = () => {
    return(
        <div>
            <Switch>
            {/* the default path displays the MainDashboard component */}
            <Route exact path='/' component={auth(MainDashboard)} />
            <Route path='/login' component={AccountsForm} />
            <Route path='/logsheet' component={auth(_Logsheet)} />
            <Route path='/timeseries' component={auth(TimeseriesContainer)} />


            {/* when the path is not found or (404) display the notfoundpage */}
            <Route component={NotFoundPage} />
            </Switch>
        </div>
    )
}

export default routes