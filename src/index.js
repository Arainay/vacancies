import React from 'react';
import { render } from 'react-dom';
import { Provider }  from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';

import configureStore from './store/configureStore';
import App from './components/App';

const store = configureStore();
const history = createBrowserHistory();

render(
<Provider store={store}>
  <ConnectedRouter history={history}>
    <App/>
  </ConnectedRouter>
  </Provider>,
document.getElementById('root')
);