import React from 'react';
import { IndexRedirect, Route } from 'react-router';
import Layout from './components/Layout';
import Login from './components/Login';
import App from './components/App';


export default (
  <Route path="/" component={Layout} >
    <IndexRedirect to="home" component={App} />
    <Route path="login" component={Login} />
    <Route path="home" component={App} />
  </Route>
);