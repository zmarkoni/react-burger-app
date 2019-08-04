import React, { Component } from 'react';
import axiosInstance from '../../axios-orders';
import Aux from '../../hoc/Aux/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
// global constant need to be with capital letters
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },

        totalPrice: 4,  // starting Price
        purchasable: false, // true if there is at least on ingredient chosen
        purchasing: false, // to know is the Order Now button is clicked
        loading: false
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
        //console.log('you continue');
        this.setState({loading:true});

        const order = {
            ingredients: this.state.ingredients,
            prince: this.state.totalPrice, // calculate price on the server better
            customer: {
                name: 'Zoran Markovic',
                address: {
                    street: 'Test street',
                    zipCode: '232342',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliverMethod: 'fastest'
        };
        // simulate network error with /orders.json123
        axiosInstance.post('/orders.json', order) // will create orders node in firebase database
            .then(response => {
                //console.log(response)
                this.setState({loading:false, purchasing: false}); // close the modal also
            })
            .catch(error => {
                //console.log(error)
                this.setState({loading:false, purchasing: false}); // close the modal also
            });
    };

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({
           purchasable: sum > 0
        });
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        // make a copy, to have immutable state
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        //console.log('add updatedIngredients: ', updatedIngredients);
        // to update the price we need to know which ingredient cost what, that info we have in INGREDIENT_PRICES
        // again we need to map price and ingredient
        const oldPrice = this.state.totalPrice;  // 4
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = oldPrice + priceAddition; // 4 + ingredientPrice
        //console.log('add newPrice: ', newPrice);

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        // if there is no ingredients, we don't need to update anything
        if (oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;
        // make a copy, to have immutable state
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        console.log('remove updatedIngredients: ', updatedIngredients);
        // to update the price we need to know which ingredient cost what, that info we have in INGREDIENT_PRICES
        // again we need to map price and ingredient
        const oldPrice = this.state.totalPrice;  // 4
        const priceDeduction = INGREDIENT_PRICES[type];

        const newPrice = oldPrice - priceDeduction; // 4 + ingredientPrice
        console.log('remove newPrice: ', newPrice);

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let ingKey in disabledInfo) {
            disabledInfo[ingKey] = (disabledInfo[ingKey] <= 0) // return boolean, ako je 0 onda je true i treba da disablujemo dugme
        }
        //console.log('disabledInfo: ', disabledInfo);
        //disabledInfo:  {salad: true, bacon: true, cheese: true, meat: true}

        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseContinue={this.purchaseContinueHandler}
            purchaseCancel={this.purchaseCancelHandler}
        />;

        if (this.state.loading) {
           orderSummary = <Spinner />;
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} stateCheck={this.state}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axiosInstance);