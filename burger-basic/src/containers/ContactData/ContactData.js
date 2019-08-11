import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.css';
import axiosInstance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        // here we need access to ingredients which are in parent component,
        // we can pass them with Route render method
        //console.log('orderHandler: ', this.props.ingredients);

        this.setState({loading: true});

        // get Form data from state orderForm
        // We just need name and value, not config...
        const formData = {};

        // formElIndetifier is name, email, country...
        for (let formElIndetifier in this.state.orderForm) {
            formData[formElIndetifier] = this.state.orderForm[formElIndetifier].value;
        }
        console.log('formData: ', formData);

        const order = {
            ingredients: this.props.ingredients, // passed from burgerBuilder
            price: this.props.price, // passed from burgerBuilder, also calculate price on the server will be better
            orderData: formData
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

    inputChangedHandler = (event, inputIndetifier) => {
        //console.log(event.target.value);
        event.preventDefault();

        // TWO-WAY data binding!!!

        const updatedOrderForm = {
            ...this.state.orderForm // Not good enouf, we need deep clone of object here since we have nested objects inside as well
            // this will only clone parent object properties like: name, email...
        };
        //console.log('updatedOrderForm: ', updatedOrderForm);

        // here we will copy nested objects as well
        const updatedFormElement = {
            ...updatedOrderForm[inputIndetifier]
        };
        //console.log('updatedFormElement: ', updatedFormElement);

        const updatedFormElementConfig = {
            ...updatedFormElement["elementConfig"]
        };
        //console.log('updatedFormElementConfig: ', updatedFormElementConfig);
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIndetifier] = updatedFormElement;
        this.setState({
            orderForm: updatedOrderForm
        })
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button buttonType="Success">ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;