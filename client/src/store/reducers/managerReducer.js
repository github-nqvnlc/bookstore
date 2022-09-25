import actionTypes from "../actions/actionTypes";

const initialState = {
  role: [],
  account: [],
};

const managerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_NEW_BOOK_SUCCESS:
      return {
        ...state,
      };
    case actionTypes.CREATE_NEW_BOOK_FAILED:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default managerReducer;
