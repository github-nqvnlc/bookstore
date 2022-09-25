import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import { createNewBookSevice } from "../../services/bookService";

// create new book
export const createNewBook = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await createNewBookSevice(data);
      if (res && res.errCode === 0) {
        toast("Create new book successfull!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(createNewBookSuccess());
      } else {
        toast.error(`Create book failed ${res.errMessage}`, {
          position: "top-right",
          autoClose: 3000,
        });
        dispatch(createNewBookFailed());
      }
    } catch (e) {
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
