import { applyMiddleware, createStore, combineReducers } from 'redux';
import { hashHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import reducers from './reducers';
const rootReducer = combineReducers({
  routing: routerReducer,
  ...reducers,
});
const logger = createLogger({
  collapsed: true,
});
const middlewares = [
  routerMiddleware(hashHistory),
  logger,
];

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(...middlewares)
);

export default store;