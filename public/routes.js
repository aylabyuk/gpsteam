import React from 'react'

// routing
import { Route } from 'react-router-dom'

// components
import _Logsheet from './comp/logsheet/_Logsheet'

const routes = () => {
    return(
        <div>
            <Route exact path='/' component={_Logsheet} />
        </div>
    )
}

export default routes