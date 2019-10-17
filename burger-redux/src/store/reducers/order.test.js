import reducer from './order';
import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/utility";

// what to test https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8268554#announcements

describe('Order reducer', () => {
    it('should return initial state', () => {
        // reducer(state, action)
        expect(reducer(undefined, {})).toEqual({
            orders: [],
            loading: false,
            purchased: false
        });
    });

    it('[purchaseBurgerStart] should return purchase:false', () => {
        expect(reducer({
            orders: [],
            loading: false,
            purchased: false
        }, {
            type: actionTypes.PURCHASE_BURGER_START
        })).toEqual({
            orders: [],
            loading: true,
            purchased: false
        });
    });

    it('[purchaseBurgerSuccess] should return purchase:false', () => {
        expect(reducer({
            orders: [],
            loading: false,
            purchased: false
        }, {
            type: actionTypes.PURCHASE_BURGER_SUCCESS,
            orderId: 123456789,
            orderData: {name:'zoran'}
        })).toEqual({
            loading: false,
            purchased: true,
            orders: [{
                id: 123456789,
                name:'zoran'
            }]
        });
    });
});