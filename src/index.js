import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import ingReducer from './store/reducers/ingReducer';
import priceReducer from './store/reducers/priceReducer';
import orderReducer from './store/reducers/orderReducer';
import authReducer from './store/reducers/authReducer';

const rootReducer = combineReducers({
  ing: ingReducer,
  price: priceReducer,
  order: orderReducer,
  auth: authReducer
});

// Following NODE_ENV variable is a enviroment variable which is 'development' if we are in 'development' mode.
// We then check if we are in development then only we can access the Redux DevTools otherwise it should not be accessible.
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
// composeEnhancers, on the other-hand, is responsible for integrating Redux DevTools in our project to read data (state and actions).  

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
