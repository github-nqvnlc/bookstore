import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  userInfo: {
    userId: null,
    email: null,
    lastName: null,
    roleId: null,
  },
  token: null,
  image: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      console.log(action)
      return {
        ...state,
        isLoggedIn: true,
        token: action.data.token,
        userInfo: {
          userId: action.data.userId,
          email: action.data.email,
          lastName: action.data.lastName,
          roleId: action.data.roleId,
        }
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
      };

    case actionTypes.GET_USER_IMAGE_SUCCESS:
      return {
        ...state,
        image: action.image,
      };
    case actionTypes.GET_USER_IMAGE_FAILED:
      return {
        ...state,
        image: null,
      };
    default:
      return state;
  }
};

export default appReducer;
