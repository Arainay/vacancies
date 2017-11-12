import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const routeMiddleware = routerMiddleware(createBrowserHistory());

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(routeMiddleware, thunk));
}