import React from 'react'

// routing
import { Route } from 'react-router-dom'

// components
import _Logsheet from './comp/logsheet/_Logsheet'
import _Staff from './comp/staff/_Staff'

const routes = () => {
    return(
        <div>
            <Route exact path='/' component={_Logsheet} />
            <Route path='/staff' component={_Staff} />
        </div>
    )
}

export default routes