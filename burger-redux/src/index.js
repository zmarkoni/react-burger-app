import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// add Redux
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import burgerBuilderReducer from './store/reducers/burgerBuilder';
import registerServiceWorker from './registerServiceWorker';

// reduxDevTools no need to install locally since it is part of Chrome extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(burgerBuilderReducer, composeEnhancers(
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
