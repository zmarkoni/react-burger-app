import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// add Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './store/reducer';
import registerServiceWorker from './registerServiceWorker';

// reduxDevTools no need to install locally since it is part of Chrome extension
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(reducer, reduxDevTools);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
