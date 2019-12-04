import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import axiosInstance from "../../axios-orders";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';

const burgerBuilder = (props) => {

    // this is UI state only, no need for Redux
    const [purchasing, setPurchasing] = useState(false); // to know is the Order Now button is clicked

    useEffect(() => {
        //console.log('[BurgerBuilder componentDidMount]', props);
        props.onInitIngredients();
    }, []);

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    };

    // Comping from backdrop, when we click on it, and pass throw Modal to BurgerBuilder via props
    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    };

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0
    };

    const disabledInfo = {
        ...props.ings
    };

    for (let ingKey in disabledInfo) {
        disabledInfo[ingKey] = (disabledInfo[ingKey] <= 0) // return boolean, ako je 0 onda je true i treba da disablujemo dugme
    }
    //console.log('disabledInfo: ', disabledInfo);
    //disabledInfo:  {salad: true, bacon: true, cheese: true, meat: true}

    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;
    if (props.ings) {
        burger = (
            <Aux>
                <Burger ingredients={props.ings}/>
                <BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabledInfo={disabledInfo}
                    price={props.price}
                    purchasable={updatePurchaseState(props.ings)}
                    ordered={purchaseHandler}
                    isAuth={props.isAuthenticated}
                />
            </Aux>
        );
        orderSummary = <OrderSummary
            ingredients={props.ings}
            price={props.price}
            purchaseContinue={purchaseContinueHandler}
            purchaseCancel={purchaseCancelHandler}
        />;
    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler} stateCheck={purchasing}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );

};

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axiosInstance));