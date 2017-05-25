import React from 'react';
import ReactDOM from 'react-dom';
import D3 from 'd3'

import { AppContainer } from 'react-hot-loader';
import Primary from './_primary'

import routes from './routes'

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
if (module.hot) {
  module.hot.accept('./routes', () => {
    const newRoutes = require('./routes').default;
    renderApp(newRoutes);
  });
}