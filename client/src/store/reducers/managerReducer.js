import actionTypes from "../actions/actionTypes";

const initialState = {
  book: [],
  author: [],
  publisher: [],
  category: [],
  catalog: [],
  type: [],

  authorByName: [],
  publisherByName: [],
  categoryByName: [],
  catalogByName: [],
  typeByName: [],

  loading: false,
};

const managerReducer = (state = initialState, action) => {
  switch (action.type) {
    //get book
    case actionTypes.GET_BOOK_START:
      state.loading = true;
      return {
        ...state,
      };
    case actionTypes.GET_BOOK_SUCCESS:
      state.book = action.data;
      state.loading = false;
      return {
        ...state,
      };
    case actionTypes.GET_BOOK_FAILED:
      state.book = [];
      return {
        ...state,
      };

    //createAuthor
    case actionTypes.CREATE_AUTHOR_SUCCESS:
      return {
        ...state,
      };

    //get author
    case actionTypes.GET_AUTHOR_SUCCESS:
      state.author = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_AUTHOR_FAILED:
      state.author = [];
      return {
        ...state,
      };
    
    

    //createPublisher
    case actionTypes.CREATE_PUBLISHER_SUCCESS:
      return {
        ...state,
      };
    //get publisher
    case actionTypes.GET_PUBLISHER_SUCCESS:
      state.publisher = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_PUBLISHER_FAILED:
      state.publisher = [];
      return {
        ...state,
      };

    // create category
    case actionTypes.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
      };
    //get category
    case actionTypes.GET_CATEGORY_SUCCESS:
      state.category = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_CATEGORY_FAILED:
      state.category = [];
      return {
        ...state,
      };
    
      // create catalog
    case actionTypes.CREATE_CATALOG_SUCCESS:
      return {
        ...state,
      };
    //get catalog
    case actionTypes.GET_CATALOG_SUCCESS:
      state.catalog = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_CATALOG_FAILED:
      state.catalog = [];
      return {
        ...state,
      };

    //create type
    case actionTypes.CREATE_TYPE_SUCCESS:
      return {
        ...state,
      };

    //get type
    case actionTypes.GET_TYPE_SUCCESS:
      state.type = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_TYPE_FAILED:
      state.type = [];
      return {
        ...state,
      };

    
    //get by name
    case actionTypes.GET_AUTHOR_BY_NAME_SUCCESS:
      state.authorByName = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_AUTHOR_BY_NAME_FAILED:
      state.authorByName = null;
      return {
        ...state,
      };
    
    case actionTypes.GET_PUBLISHER_BY_NAME_SUCCESS:
      state.publisherByName = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_PUBLISHER_BY_NAME_FAILED:
      state.publisherByName = null;
      return {
        ...state,
      };
    
    case actionTypes.GET_CATEGORY_BY_NAME_SUCCESS:
      state.categoryByName = action.data;
      console.log(state.categoryByName)
      return {
        ...state,
      };
    case actionTypes.GET_CATEGORY_BY_NAME_FAILED:
      state.categoryByName = null;
      return {
        ...state,
      };
    
    case actionTypes.GET_CATALOG_BY_NAME_SUCCESS:
      state.catalogByName = action.data;
      console.log(state.catalogByName)
      return {
        ...state,
      };
    case actionTypes.GET_CATALOG_BY_NAME_FAILED:
      state.catalogByName = null;
      return {
        ...state,
      };
    
    case actionTypes.GET_TYPE_BY_NAME_SUCCESS:
      state.typeByName = action.data;

      return {
        ...state,
      };
    case actionTypes.GET_TYPE_BY_NAME_FAILED:
      state.typeByName = null;
      return {
        ...state,
      };
    
    
    default:
      return state;
  }
};

export default managerReducer;
