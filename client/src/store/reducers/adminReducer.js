import actionTypes from '../actions/actionTypes';

const initialState = {
    role: [],
    account: []
}

const adminReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.FETCH_ROLE_START:
            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            let copyState = { ...state }
            copyState.role = action.data;
            return {
                ...copyState,
            }

        case actionTypes.FETCH_ROLE_FAILED:
            return {
                ...state,

            }
        // get all account
        case actionTypes.GET_ALL_ACCOUNT_SUCCESS:
            state.account = action.data
            return {
                ...state,
            }

        case actionTypes.GET_ALL_ACCOUNT_FAILED:
            state.account = []
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;