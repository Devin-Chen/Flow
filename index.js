import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import * as Action from './actions';
import { Opinion, ActionType } from './constants';
import reducer from './reducers';
import App from './components';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore);
const store = createStoreWithMiddleware(reducer);
//const store = createStore(reducer);

/*
store.dispatch(Action.play());
store.dispatch(Action.pause());
store.dispatch(Action.like());
store.dispatch(Action.like());
store.dispatch(Action.dislike());
store.dispatch(Action.next());
*/


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

