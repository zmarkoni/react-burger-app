import React, {Component} from 'react';
import axiosInstance from '../../axios-orders';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

    // this is UI state only, no need for Redux
    state = {
        purchasing: false, // to know is the Order Now button is clicked
        loading: false,
        error: false
    };

    // https://www.udemy.com/react-the-complete-guide-incl-redux/learn/lecture/8145370#overview
    componentDidMount() {
        //console.log('BurgerBuilder props: ', this.props);

        // Will be fixed in Redux later, for it will be hardcoded in Reducer
        // axiosInstance.get('https://react-my-burger-e5a66.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({
        //             ingredients: response.data
        //         });
        //     }).catch(error => {
        //     this.setState({
        //         error: true
        //     });
        // });
    };

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
        const queryParams = [];
        for (let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        }

        queryParams.push('price=' + this.props.price);

        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
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
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;
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

        if (this.state.loading) {
            orderSummary = <Spinner/>;
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
    ings:state.ingredients,
    price: state.totalPrice
}
};

const mapDispatchToProps = (dispatch) => {
return {
onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
}
};



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));