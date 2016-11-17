import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './core/routes';
import store from './core/store';
const history = syncHistoryWithStore(hashHistory, store);
render(
  <Provider store={store} >
    <Router
      history={history}
    >
      {routes}
    </Router>
  </Provider>, document.getElementById('main'));
