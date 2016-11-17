import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './core/routes';
import store from './core/store';
import actions from './core/actions';
import firebase from './core/firebase';
const history = syncHistoryWithStore(hashHistory, store);

const contentRef = firebase.database().ref('contents/testing');
contentRef.on('value', (snapshot)=> {
  store.dispatch(actions.contentReady(snapshot.val()));
},(errorObject) =>{
  console.log("The read failed: " + errorObject.code);
});

render(
  <Provider store={store} >
    <Router
      history={history}
    >
      {routes}
    </Router>
  </Provider>, document.getElementById('main'));
