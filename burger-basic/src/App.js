import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import withErrorHandler from "./hoc/withErrorHandler/withErrorHandler";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import { Route, Switch } from 'react-router-dom';

class App extends Component {

    // Testing withErrorHandler => componentWillUnmount
    /*
    state = {
        show: true
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({show: false});
        }, 5000);
    };
     */

    render() {
    return (
      <div>
        <Layout>
            {/*{this.state.show ? <BurgerBuilder/> : null}*/}
            {/*<BurgerBuilder/>*/}
            {/*<Checkout/>*/}
            <Switch>
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" component={Orders} />
                <Route path="/" exact component={BurgerBuilder} />
            </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
