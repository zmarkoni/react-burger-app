// Project Console: https://console.firebase.google.com/project/react-my-burger-e5a66/overview
// Hosting URL: https://react-my-burger-e5a66.firebaseapp.com


import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

// add Redux
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
});

// USE Environment variable to for determining whether we’re running in production mode.
// react-burger-app/burger-redux/config/env.js line 71=>  NODE_ENV: process.env.NODE_ENV || 'development',
//process.env.NODE_ENV === 'development' ?

// reduxDevTools no need to install locally since it is part of Chrome extension
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();