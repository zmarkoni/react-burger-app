import React, {Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import axiosInstance from "../../axios-orders";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {

    // this is UI state only, no need for Redux
    state = {
        purchasing: false, // to know is the Order Now button is clicked
    };

    componentDidMount() {
        //console.log('[BurgerBuilder componentDidMount]', this.props);
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    };

    // Comping from backdrop, when we click on it, and pass throw Modal to BurgerBuilder via props
    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0
    };

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let ingKey in disabledInfo) {
            disabledInfo[ingKey] = (disabledInfo[ingKey] <= 0) // return boolean, ako je 0 onda je true i treba da disablujemo dugme
        }
        //console.log('disabledInfo: ', disabledInfo);
        //disabledInfo:  {salad: true, bacon: true, cheese: true, meat: true}

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseContinue={this.purchaseContinueHandler}
                purchaseCancel={this.purchaseCancelHandler}
            />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} stateCheck={this.state}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));