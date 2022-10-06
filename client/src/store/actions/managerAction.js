import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  //book
  createNewBookSevice,
  deleteBookService,
  editBookService,
  getBookService,

  //author
  createAuthorSevice,
  deleteAuthorService,
  editAuthorService,
  getAuthorService,

  //publisher
  createPublisherSevice,
  deletePublisherService,
  editPublisherService,
  getPublisherService,

  //category
  createCategorySevice,
  deleteCategoryService,
  editCategoryService,
  getCategoryService,

  //type
  createTypeSevice,
  deleteTypeService,
  editTypeService,
  getTypeService,

  //get by name
  getAuthorByNameService,
  getPublisherByNameService,
  getCategoryByNameService,
  getTypeByNameService,
} from "../../services/bookService";

//===============================================================//
// create new book
export const createNewBook = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewBookSevice(data);
      if (res && res.errCode === 0) {
        toast.success("Create new book successfull!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(createNewBookSuccess());
        dispatch(getBook("ALL"));
      } else {
        toast.error(`Create book failed ${res.errMessage}`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(createNewBookFailed());
      }
    } catch (error) {
      dispatch(createNewBookFailed());
    }
  };
};
export const createNewBookSuccess = () => ({
  type: actionTypes.CREATE_NEW_BOOK_SUCCESS,
});
export const createNewBookFailed = () => ({
  type: actionTypes.CREATE_NEW_BOOK_FAILED,
});
//get book
export const getBook = (id) => {
  return async (dispatch, getState) => {
    try {
      if (id && id === "ALL") {
        let res = await getBookService(id);
        if (res && res.errCode === 0) {
          dispatch(getBookSuccess(res.book.reverse()));
        } else {
          dispatch(getBookFailed());
        }
      } else {
        let res = await getBookService(id);
        if (res && res.errCode === 0) {
          dispatch(getBookSuccess(res.book));
        } else {
          dispatch(getBookFailed());
        }
      }
      
    } catch (error) {
      dispatch(getBookFailed());
      console.log(error)
    }
  };
};
export const getBookSuccess = (data) => ({
  type: actionTypes.GET_BOOK_SUCCESS,
  data: data,
});
export const getBookFailed = (data) => ({
  type: actionTypes.GET_BOOK_FAILED,
  data: data,
});
//delete book
export const deleteBook = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteBookService(id);
      if (res && res.errCode === 0) {
        toast.success(`Delete book successful!`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(deleteBookSuccess());
        dispatch(getBook("ALL"));
      } else {
        toast.error("Delete book failed!", {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(deleteBookFailed());
      }
    } catch (error) {
      dispatch(deleteBookFailed());
    }
  };
};
export const deleteBookSuccess = () => ({
  type: actionTypes.DELETE_BOOK_SUCCESS,
});
export const deleteBookFailed = () => ({
  type: actionTypes.DELETE_BOOK_FAILED,
});
//edit book
export const editBook = (book) => {
  return async (dispatch, getState) => {
    try {
      console.log(book.checkEdit)
      if (book.checkEdit && book.checkEdit === "ALL") {
        let res = await editBookService(book);
        if (res && res.errCode === 0) {
          toast.success(`Edit book successful!`, {
            position: "bottom-right",
            autoClose: 3000,
          });
          dispatch(editBookSuccess());
          dispatch(getBook("ALL"));
        } else {
          toast.error(`Edit book failed`, {
            position: "bottom-right",
            autoClose: 3000,
          });
          dispatch(editBookFailed());
        }
      } else if (book.checkEdit && book.checkEdit === "ONE") {
        let res = await editBookService(book);
        if (res && res.errCode === 0) {
          toast.success(`Edit book successful!`, {
            position: "bottom-right",
            autoClose: 3000,
          });
          dispatch(editBookSuccess());
          dispatch(getBook(book.id));
        } else {
          toast.error(`Edit book failed`, {
            position: "bottom-right",
            autoClose: 3000,
          });
          dispatch(editBookFailed());
        }
      }
      
    } catch (error) {
      toast.error(`Edit book error! ${error}`, {
        position: "bottom-right",
        autoClose: 3000,
      });
      dispatch(editBookFailed());
    }
  };
};
export const editBookSuccess = () => ({
  type: actionTypes.EDIT_BOOK_SUCCESS,
});
export const editBookFailed = () => ({
  type: actionTypes.EDIT_BOOK_FAILED,
});

//===============================================================//
//create author
export const createAuthor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createAuthorSevice(data);
      if (res && res.errCode === 0) {
        toast.success("Create new author successfull!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(createAuthorSuccess());
        dispatch(getAuthor("ALL"));
        dispatch(getAuthorByName(data.name));
      } else {
        toast.error(`Create author failed ${res.errMessage}`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(createAuthorFailed());
      }
    } catch (error) {
      dispatch(createAuthorFailed());
    }
  };
};
export const createAuthorSuccess = () => ({
  type: actionTypes.CREATE_AUTHOR_SUCCESS,
});
export const createAuthorFailed = () => ({
  type: actionTypes.CREATE_AUTHOR_FAILED,
});
//get author
export const getAuthor = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAuthorService(id);
      console.log(res)
      if (res && res.errCode === 0) {
        dispatch(getAuthorSuccess(res.author.reverse()));
      } else {
        dispatch(getAuthorFailed());
      }
    } catch (error) {
      dispatch(getAuthorFailed());
    }
  };
};
export const getAuthorSuccess = (data) => ({
  type: actionTypes.GET_AUTHOR_SUCCESS,
  data: data,
});
export const getAuthorFailed = (data) => ({
  type: actionTypes.GET_AUTHOR_FAILED,
  data: data,
});

//delete author
export const deleteAuthor = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteAuthorService(id);
      if (res && res.errCode === 0) {
        toast.success(`Delete author successful!`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(deleteAuthorSuccess());
        dispatch(getAuthor("ALL"));
      } else {
        toast.error("Delete author failed!", {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(deleteAuthorFailed());
      }
    } catch (error) {
      dispatch(deleteAuthorFailed());
    }
  };
};
export const deleteAuthorSuccess = () => ({
  type: actionTypes.DELETE_AUTHOR_SUCCESS,
});
export const deleteAuthorFailed = () => ({
  type: actionTypes.DELETE_AUTHOR_FAILED,
});
//edit author
export const editAuthor = (author) => {
  return async (dispatch, getState) => {
    try {
      let res = await editAuthorService(author);
      if (res && res.errCode === 0) {
        toast.success(`Edit author successful!`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(editAuthorSuccess());
        dispatch(getAuthor("ALL"));
      } else {
        toast.error(`Edit author failed`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(editAuthorFailed());
      }
    } catch (error) {
      toast.error(`Edit author error! ${error}`, {
        position: "bottom-right",
        autoClose: 3000,
      });
      dispatch(editAuthorFailed());
    }
  };
};
export const editAuthorSuccess = () => ({
  type: actionTypes.EDIT_AUTHOR_SUCCESS,
});
export const editAuthorFailed = () => ({
  type: actionTypes.EDIT_AUTHOR_FAILED,
});

//===============================================================//
//create publisher
export const createPublisher = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createPublisherSevice(data);
      if (res && res.errCode === 0) {
        toast.success("Create new publisher successfull!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(createPublisherSuccess());
        dispatch(getPublisher("ALL"));
        dispatch(getPublisherByName(data.name));
      } else {
        toast.error(`Create publisher failed ${res.errMessage}`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(createPublisherFailed());
      }
    } catch (error) {
      dispatch(createPublisherFailed());
    }
  };
};
export const createPublisherSuccess = () => ({
  type: actionTypes.CREATE_PUBLISHER_SUCCESS,
});
export const createPublisherFailed = () => ({
  type: actionTypes.CREATE_PUBLISHER_FAILED,
});
//get publisher
export const getPublisher = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getPublisherService(id);
      if (res && res.errCode === 0) {
        dispatch(getPublisherSuccess(res.publisher.reverse()));
      } else {
        dispatch(getPublisherFailed());
      }
    } catch (error) {
      dispatch(getPublisherFailed());
    }
  };
};
export const getPublisherSuccess = (data) => ({
  type: actionTypes.GET_PUBLISHER_SUCCESS,
  data: data,
});
export const getPublisherFailed = (data) => ({
  type: actionTypes.GET_PUBLISHER_FAILED,
  data: data,
});
//delete publisher
export const deletePublisher = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deletePublisherService(id);
      if (res && res.errCode === 0) {
        toast.success(`Delete publisher successful!`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(deletePublisherSuccess());
        dispatch(getPublisher("ALL"));
      } else {
        toast.error("Delete publisher failed!", {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(deletePublisherFailed());
      }
    } catch (error) {
      dispatch(deletePublisherFailed());
    }
  };
};
export const deletePublisherSuccess = () => ({
  type: actionTypes.DELETE_PUBLISHER_SUCCESS,
});
export const deletePublisherFailed = () => ({
  type: actionTypes.DELETE_PUBLISHER_FAILED,
});
//edit publisher
export const editPublisher = (publisher) => {
  return async (dispatch, getState) => {
    try {
      let res = await editPublisherService(publisher);
      if (res && res.errCode === 0) {
        toast.success(`Edit publisher successful!`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(editPublisherSuccess());
        dispatch(getPublisher("ALL"));
      } else {
        toast.error(`Edit publisher failed`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(editPublisherFailed());
      }
    } catch (error) {
      toast.error(`Edit publisher error! ${error}`, {
        position: "bottom-right",
        autoClose: 3000,
      });
      dispatch(editPublisherFailed());
    }
  };
};
export const editPublisherSuccess = () => ({
  type: actionTypes.EDIT_PUBLISHER_SUCCESS,
});
export const editPublisherFailed = () => ({
  type: actionTypes.EDIT_PUBLISHER_FAILED,
});

//===============================================================//
//create category
export const createCategory = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createCategorySevice(data);
      if (res && res.errCode === 0) {
        toast.success("Create new category successfull!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(createCategorySuccess());
        dispatch(getCategory("ALL"));
        dispatch(getCategoryByName(data.name));
      } else {
        toast.error(`Create category failed ${res.errMessage}`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(createCategoryFailed());
      }
    } catch (error) {
      dispatch(createCategoryFailed());
    }
  };
};
export const createCategorySuccess = () => ({
  type: actionTypes.CREATE_CATEGORY_SUCCESS,
});
export const createCategoryFailed = () => ({
  type: actionTypes.CREATE_CATEGORY_FAILED,
});
//get category
export const getCategory = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getCategoryService(id);
      if (res && res.errCode === 0) {
        dispatch(getCategorySuccess(res.category.reverse()));
      } else {
        dispatch(getCategoryFailed());
      }
    } catch (error) {
      dispatch(getCategoryFailed());
    }
  };
};
export const getCategorySuccess = (data) => ({
  type: actionTypes.GET_CATEGORY_SUCCESS,
  data: data,
});
export const getCategoryFailed = (data) => ({
  type: actionTypes.GET_CATEGORY_FAILED,
  data: data,
});
//delete category
export const deleteCategory = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteCategoryService(id);
      if (res && res.errCode === 0) {
        toast.success(`Delete category successful!`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(deleteCategorySuccess());
        dispatch(getCategory("ALL"));
      } else {
        toast.error("Delete category failed!", {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(deleteCategoryFailed());
      }
    } catch (error) {
      dispatch(deleteCategoryFailed());
    }
  };
};
export const deleteCategorySuccess = () => ({
  type: actionTypes.DELETE_CATEGORY_SUCCESS,
});
export const deleteCategoryFailed = () => ({
  type: actionTypes.DELETE_CATEGORY_FAILED,
});
//edit category
export const editCategory = (category) => {
  return async (dispatch, getState) => {
    try {
      let res = await editCategoryService(category);
      if (res && res.errCode === 0) {
        toast.success(`Edit category successful!`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(editCategorySuccess());
        dispatch(getCategory("ALL"));
      } else {
        toast.error(`Edit category failed`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(editCategoryFailed());
      }
    } catch (error) {
      toast.error(`Edit category error! ${error}`, {
        position: "bottom-right",
        autoClose: 3000,
      });
      dispatch(editCategoryFailed());
    }
  };
};
export const editCategorySuccess = () => ({
  type: actionTypes.EDIT_CATEGORY_SUCCESS,
});
export const editCategoryFailed = () => ({
  type: actionTypes.EDIT_CATEGORY_FAILED,
});

//===============================================================//
//create type
export const createType = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createTypeSevice(data);
      if (res && res.errCode === 0) {
        toast.success("Create new type successfull!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(createTypeSuccess());
        dispatch(getType("ALL"));
        dispatch(getTypeByName(data.name));
      } else {
        toast.error(`Create type failed ${res.errMessage}`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(createTypeFailed());
      }
    } catch (error) {
      dispatch(createTypeFailed());
    }
  };
};
export const createTypeSuccess = () => ({
  type: actionTypes.CREATE_TYPE_SUCCESS,
});
export const createTypeFailed = () => ({
  type: actionTypes.CREATE_TYPE_FAILED,
});
//get type
export const getType = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getTypeService(id);
      if (res && res.errCode === 0) {
        dispatch(getTypeSuccess(res.type.reverse()));
      } else {
        dispatch(getTypeFailed());
      }
    } catch (error) {
      dispatch(getTypeFailed());
    }
  };
};
export const getTypeSuccess = (data) => ({
  type: actionTypes.GET_TYPE_SUCCESS,
  data: data,
});
export const getTypeFailed = (data) => ({
  type: actionTypes.GET_TYPE_FAILED,
  data: data,
});
//delete type
export const deleteType = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteTypeService(id);
      if (res && res.errCode === 0) {
        toast.success(`Delete type successful!`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(deleteTypeSuccess());
        dispatch(getType("ALL"));
      } else {
        toast.error("Delete type failed!", {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(deleteTypeFailed());
      }
    } catch (error) {
      dispatch(deleteTypeFailed());
    }
  };
};
export const deleteTypeSuccess = () => ({
  type: actionTypes.DELETE_TYPE_SUCCESS,
});
export const deleteTypeFailed = () => ({
  type: actionTypes.DELETE_TYPE_FAILED,
});
//edit type
export const editType = (type) => {
  return async (dispatch, getState) => {
    try {
      let res = await editTypeService(type);
      if (res && res.errCode === 0) {
        toast.success(`Edit type successful!`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(editTypeSuccess());
        dispatch(getType("ALL"));
      } else {
        toast.error(`Edit type failed`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(editTypeFailed());
      }
    } catch (error) {
      toast.error(`Edit type error! ${error}`, {
        position: "bottom-right",
        autoClose: 3000,
      });
      dispatch(editTypeFailed());
    }
  };
};
export const editTypeSuccess = () => ({
  type: actionTypes.EDIT_TYPE_SUCCESS,
});
export const editTypeFailed = () => ({
  type: actionTypes.EDIT_TYPE_FAILED,
});

//get by name
export const getAuthorByName = (name) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAuthorByNameService(name);
      if (res && res.errCode === 0) {
        dispatch(getAuthorByNameSuccess(res.author));
      } else {
        dispatch(getAuthorByNameFailed());
      }
    } catch (error) {
      dispatch(getAuthorByNameFailed());
    }
  };
};
export const getAuthorByNameSuccess = (data) => ({
  type: actionTypes.GET_AUTHOR_BY_NAME_SUCCESS,
  data: data,
});
export const getAuthorByNameFailed = (data) => ({
  type: actionTypes.GET_AUTHOR_BY_NAME_FAILED,
  data: data,
});

export const getPublisherByName = (name) => {
  return async (dispatch, getState) => {
    try {
      let res = await getPublisherByNameService(name);
      if (res && res.errCode === 0) {
        dispatch(getPublisherByNameSuccess(res.publisher));
      } else {
        dispatch(getPublisherByNameFailed());
      }
    } catch (error) {
      dispatch(getPublisherByNameFailed());
    }
  };
};
export const getPublisherByNameSuccess = (data) => ({
  type: actionTypes.GET_PUBLISHER_BY_NAME_SUCCESS,
  data: data,
});
export const getPublisherByNameFailed = (data) => ({
  type: actionTypes.GET_PUBLISHER_BY_NAME_FAILED,
  data: data,
});

export const getCategoryByName = (name) => {
  return async (dispatch, getState) => {
    try {
      let res = await getCategoryByNameService(name);
      if (res && res.errCode === 0) {
        dispatch(getCategoryByNameSuccess(res.category));
      } else {
        dispatch(getCategoryByNameFailed());
      }
    } catch (error) {
      dispatch(getCategoryByNameFailed());
    }
  };
};
export const getCategoryByNameSuccess = (data) => ({
  type: actionTypes.GET_CATEGORY_BY_NAME_SUCCESS,
  data: data,
});
export const getCategoryByNameFailed = (data) => ({
  type: actionTypes.GET_CATEGORY_BY_NAME_FAILED,
  data: data,
});

export const getTypeByName = (name) => {
  return async (dispatch, getState) => {
    try {
      let res = await getTypeByNameService(name);
      if (res && res.errCode === 0) {
        dispatch(getTypeByNameSuccess(res.type));
      } else {
        dispatch(getTypeByNameFailed());
      }
    } catch (error) {
      dispatch(getTypeByNameFailed());
    }
  };
};
export const getTypeByNameSuccess = (data) => ({
  type: actionTypes.GET_TYPE_BY_NAME_SUCCESS,
  data: data,
});
export const getTypeByNameFailed = (data) => ({
  type: actionTypes.GET_TYPE_BY_NAME_FAILED,
  data: data,
});

// get by id

