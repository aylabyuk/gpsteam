import React from 'react'

// routing
import { Route, Switch } from 'react-router-dom'

// components
import _Logsheet from './comp/logsheet/_Logsheet'
import _Staff from './comp/staff/_Staff'
import NotFoundPage from './comp/NotFoundPage'

const routes = () => {
    return(
        <div>
            <Switch>
            <Route exact path='/' component={_Logsheet} />
            <Route path='/staff' component={_Staff} />

            <Route component={NotFoundPage} />
            </Switch>
        </div>
    )
}

export default routes