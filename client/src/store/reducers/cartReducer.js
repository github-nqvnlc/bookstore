import { combineReducers } from 'redux';
import actionTypes from "../actions/actionTypes";

const initialState = {
    bookInCart: [],

    numberCart: 0,
    Carts: [],
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART_SUCCESS:
            let check = false;
            state.bookInCart?.map((item, index) => {
                if (item === action.data) { check = true; }
            })
            if (check === false) {
                state.bookInCart = [...state.bookInCart, action.data]
            }
            return {
                ...state,
            }
        case actionTypes.REMOVE_TO_CART:
            state.bookInCart = state.bookInCart?.filter(item => item !== action.data)
            return {
                ...state,
            }

       //=================
        case actionTypes.GET_NUMBER_CART:
            return {
                ...state
            }
        case actionTypes.ADD_CART:
            if (state.numberCart === 0) {
                let cart = {
                    id: action.payload.id,
                    quantity: 1,
                    name: action.payload.name,
                    image: action.payload.image,
                    price: action.payload.price,
                    discount: action.payload.discount,
                }
                state.Carts.push(cart);
            }
            else {
                let check = false;
                state.Carts.map((item, key) => {
                    if (item.id === action.payload.id) {
                        state.Carts[key].quantity++;
                        check = true;
                    }
                });
                if (!check) {
                    let _cart = {
                        id: action.payload.id,
                        quantity: 1,
                        name: action.payload.name,
                        image: action.payload.image,
                        price: action.payload.price,
                        discount: action.payload.discount,
                    }
                    state.Carts.push(_cart);
                }
            }
            return {
                ...state,
                numberCart: state.numberCart + 1
            }
        case actionTypes.INCREASE_QUANTITY:
            state.numberCart++
            state.Carts[action.payload].quantity++;

            return {
                ...state
            }
        case actionTypes.DECREASE_QUANTITY:
            let quantity = state.Carts[action.payload].quantity;
            if (quantity > 1) {
                state.numberCart--;
                state.Carts[action.payload].quantity--;
            }

            return {
                ...state
            }
        case actionTypes.DELETE_CART:
            return {
                ...state,
                numberCart: state.numberCart - action.payload.quantity,
                Carts: state.Carts.filter(item => {
                    return item.id !== action.payload.id
                })
            }


        default:
            return state;
    }
}


export default cartReducer