import actionTypes from './actionTypes';

export const addToCart = (book) =>({
    type: actionTypes.ADD_TO_CART_SUCCESS,
    data: book
})


export const removeToCart = (book) => ({
    type: actionTypes.REMOVE_TO_CART,
    data: book
})


/*GET NUMBER CART*/
export function GetNumberCart() {
    return {
        type: 'GET_NUMBER_CART'
    }
}

export function AddCart(payload) {
    return {
        type: 'ADD_CART',
        payload
    }
}
export function UpdateCart(payload) {
    return {
        type: 'UPDATE_CART',
        payload
    }
}
export function DeleteCart(payload) {
    return {
        type: 'DELETE_CART',
        payload
    }
}

export function IncreaseQuantity(payload) {
    return {
        type: 'INCREASE_QUANTITY',
        payload
    }
}
export function DecreaseQuantity(payload) {
    return {
        type: 'DECREASE_QUANTITY',
        payload
    }
}