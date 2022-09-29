import actionTypes from "../actions/actionTypes";

const initialState = {
  book: [],
  author: [],
  publisher: [],
  category: [],
  type: [],
};

const managerReducer = (state = initialState, action) => {
  switch (action.type) {
    //get book
    case actionTypes.GET_BOOK_SUCCESS:
      state.book = action.data
      return {
        ...state
      }
    case actionTypes.GET_BOOK_FAILED:
      state.book = []
      return {
        ...state
      }
    
    //get author
    case actionTypes.GET_AUTHOR_SUCCESS:
      state.author = action.data
      return {
        ...state
      }
    case actionTypes.GET_AUTHOR_FAILED:
      state.author = []
      return {
        ...state
      }
    
    //get publisher
    case actionTypes.GET_PUBLISHER_SUCCESS:
      state.publisher = action.data
      return {
        ...state
      }
    case actionTypes.GET_PUBLISHER_FAILED:
      state.publisher = []
      return {
        ...state
      }

    //get category
    case actionTypes.GET_CATEGORY_SUCCESS:
      state.category = action.data
      return {
        ...state
      }
    case actionTypes.GET_CATEGORY_FAILED:
      state.category = []
      return {
        ...state
      }
    
    //get type
    case actionTypes.GET_TYPE_SUCCESS:
      state.type = action.data
      return {
        ...state
      }
    case actionTypes.GET_TYPE_FAILED:
      state.type = []
      return {
        ...state
      }

    default:
      return state;
  }
};

export default managerReducer;
