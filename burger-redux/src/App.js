import React, { Component } from 'react';
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import { Route, Switch, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

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

    componentDidMount() {
        this.props.onTryAutoSignUp();
    }

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

const mapDispatchToProps = (dispatch) => {
      return {
          onTryAutoSignUp: () => dispatch(actions.authCheckState())
      }
};

export default withRouter(connect(null, mapDispatchToProps)(App));
