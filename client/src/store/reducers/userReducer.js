import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    image: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            console.log(action)
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        
        case actionTypes.GET_USER_IMAGE_SUCCESS:
            console.log(action)
            return {
                ...state,
                image: action.image
            }
        case actionTypes.GET_USER_IMAGE_FAILED:
            return {
                ...state,
                image: null
            }
        default:
            return state;
    }
}

export default appReducer;