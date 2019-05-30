import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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

        totalPrice: 4  // starting Price
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        // make a copy, to have immutable state
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        console.log('add updatedIngredients: ', updatedIngredients);
        // to update the price we need to know which ingredient cost what, that info we have in INGREDIENT_PRICES
        // again we need to map price and ingredient
        const oldPrice = this.state.totalPrice;  // 4
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = oldPrice + priceAddition; // 4 + ingredientPrice
        console.log('add newPrice: ', newPrice);

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
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

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;