import * as React from 'react';

import _LogsheetViewer from './comp/logsheetViewer/_LogsheetViewer';
import App from './App';
import NotFoundPage from './comp/NotFoundPage';
import { Switch, Route } from 'react-router-dom'

export default (
  <Switch>
    <Route exact path="/" component={ App } />
    <Route path="/logsheets" component={ _LogsheetViewer } />
    <Route path="*" component={ NotFoundPage }/>
  </Switch>
);