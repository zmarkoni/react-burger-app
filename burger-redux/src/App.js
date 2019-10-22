import React, { Component } from 'react';
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth');
});

const asyncLogout = asyncComponent(() => {
    return import('./containers/Auth/Logout/Logout');
});

class App extends Component {

    render() {
    return (
      <div>
        <Layout>
            <Switch>
                <Route path="/checkout" component={asyncCheckout} />
                <Route path="/orders" component={asyncOrders} />
                <Route path="/auth" component={asyncAuth} />
                <Route path="/logout" component={asyncLogout} />
                <Route path="/" exact component={BurgerBuilder} />
            </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
