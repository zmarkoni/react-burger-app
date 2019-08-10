import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.css';
import axiosInstance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        // here we need access to ingredients which are in parent component,
        // we can pass them with Route render method
        //console.log('orderHandler: ', this.props.ingredients);

        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients, // passed from burgerBuilder
            price: this.props.price, // passed from burgerBuilder, also calculate price on the server will be better
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
                this.setState({loading: false}); // close the modal also
                this.props.history.push('/'); // we don't have history here since for passing Route we have use RENDER
                // But we can pass it as a PROPS there in Render method!
            })
            .catch(error => {
                //console.log(error)
                this.setState({loading: false}); // close the modal also
            });

    };

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                <input className={classes.Input} type="number" name="postal" placeholder="Postal Code"/>
                <Button buttonType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );

        if(this.state.loading) {
            form = <Spinner/>
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;