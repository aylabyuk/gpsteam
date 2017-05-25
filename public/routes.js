import React from 'react'

// routing
import { Route, Switch } from 'react-router-dom'

// components
import _Logsheet from './comp/logsheet/_Logsheet'
import _Staff from './comp/staff/_Staff'
import _FieldWork from './comp/fieldworks/_FieldWork'
import MainDashboard from './comp/dashboard/MainDashboard'
import NotFoundPage from './comp/NotFoundPage'

const routes = () => {
    return(
        <div>
            <Switch>
            <Route exact path='/' component={MainDashboard} />
            <Route path='/logsheet' component={_Logsheet} />
            <Route path='/staff' component={_Staff} />

            <Route component={NotFoundPage} />
            </Switch>
        </div>
    )
}

export default routes