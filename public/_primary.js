/* eslint-disable */

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import rootReducer from './reducers/index'
import App from './App'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

//React Components
import AttendHome from './comp/AttendHome'
import Login from './comp/Login'
import Dashboard from './comp/Dashboard'
import NotFoundPage from './comp/NotFoundPage'
import TimeSeries from './comp/TimeSeries'
import TimeSeriesContainer from './comp/TimeSeriesContainer'
import TestDashboard from './comp/TestDashboard'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


const history = syncHistoryWithStore(browserHistory, store);

//hot reload reducer
if(module.hot) {
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    })
}

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={AttendHome} />
                <Route path="/login" component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/testdashboard" component={TestDashboard} />

                <Route path="*" component={NotFoundPage} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById("app")
)