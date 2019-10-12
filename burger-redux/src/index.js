import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// add Redux
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer
});
// reduxDevTools no need to install locally since it is part of Chrome extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

// const firebaseConfig = {
//   apiKey: "AIzaSyCYwvl_XzNqcmI2vk4soqfEneliUMqPii0",
//   authDomain: "react-my-burger-e5a66.firebaseapp.com",
//   databaseURL: "https://react-my-burger-e5a66.firebaseio.com",
//   projectId: "react-my-burger-e5a66",
//   storageBucket: "react-my-burger-e5a66.appspot.com",
//   messagingSenderId: "388443771500",
//   appId: "1:388443771500:web:a9541206e3050a29663e49"
// };
//
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();