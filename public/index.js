import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import primary from './_primary';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
        <Component/>
    </AppContainer>,
    document.getElementById('app')
  );
};

render(primary);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./_primary', () => {
    render(primary)
  });
}