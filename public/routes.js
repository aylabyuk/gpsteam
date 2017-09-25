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
import { sideNav } from './comp/sidenav/SideNav'

// redirect modules
import { requireAuthentication as auth }  from './comp/accounts/requireAuth'
import { requireStaff as staff }  from './comp/accounts/requireStaff'

const routes = () => {
    return(
        <div>
            <Switch>
            {/* the default path displays the MainDashboard component */}
            <Route exact path='/' component={auth(sideNav(MainDashboard))} />
            <Route path='/login' component={AccountsForm} />
            <Route path='/logsheet' component={auth(staff(sideNav(_Logsheet)))} />
            <Route path='/timeseries' component={auth(staff(sideNav(TimeseriesContainer)))} />


            {/* when the path is not found or (404) display the notfoundpage */}
            <Route component={NotFoundPage} />
            </Switch>
        </div>
    )
}

export default routes