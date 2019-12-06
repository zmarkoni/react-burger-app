import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import axiosInstance from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions";
import Spinner from '../../components/UI/Spinner/Spinner';

const orders = (props) => {
    const {fetchOrders} = props;

    useEffect(() => {
        fetchOrders(props.token, props.userId);
    }, [fetchOrders]);

    let orders = <Spinner/>;
    if (!props.loading) {
        orders = (
            <div>
                {props.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))}
            </div>
        );
    }
    return orders;
};

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axiosInstance));