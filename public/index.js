import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import Primary from './_primary'

import routes from './routes'

// render the application with routes provided
// react will look for the element <app> and will put all rendered elements into that tag 

const renderApp = appRoutes => {
  ReactDOM.render(
    <AppContainer>
        <Primary routes={appRoutes} />
    </AppContainer>,
    document.getElementById('app')
  );
};

renderApp(routes);

// Hot Module Replacement API
// whenever there is a change in the code the browser will listen and make nessesary changes to the app automatically
if (module.hot) {
  module.hot.accept('./routes', () => {
    const newRoutes = require('./routes').default;
    renderApp(newRoutes);
  });
}