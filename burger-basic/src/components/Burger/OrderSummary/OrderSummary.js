import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    // Can be functional component, here it is Class only because we test componentDidUpdate
    // Also we can use React
    componentDidUpdate() {
        console.log('[OrderSummary] Did Update!');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(ingKey => {
            return (
                <li key={ingKey}>
                    <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {this.props.ingredients[ingKey]}
                </li>
            )
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.purchaseCancel} buttonType="Danger">CANCEL</Button>
                <Button clicked={this.props.purchaseContinue} buttonType="Success">CONTINUE</Button>
            </Aux>
        );
    };
}

export default OrderSummary;