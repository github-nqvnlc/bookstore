import actionTypes from "./actionTypes";
import { getUserImageService } from "../../services/userService";

export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});

export const userLoginSuccess = (data) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  data: data,
});

export const userLoginFail = () => ({
  type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

//Register
export const userRegisterSuccess = (data) => ({
  type: actionTypes.USER_REGISTER_SUCCESS,
  data: data,
});
export const userRegisterFailed = () => ({
  type: actionTypes.USER_REGISTER_FAILED,
});

//get Image user
export const getUserImage = (id) => {
  return async (dispatch, getState) => {
    try {
      let data = await getUserImageService(id);
      if (data && data.errCode === 0) {
        let image64 = new Buffer(data.image, "base64").toString("binary");
        dispatch(getUserImageSuccess(image64));
      } else {
        dispatch(getUserImageFailed());
      }
    } catch (e) {
      dispatch(getUserImageFailed());
    }
  };
};

export const getUserImageSuccess = (image) => ({
  type: actionTypes.GET_USER_IMAGE_SUCCESS,
  image: image,
});
export const getUserImageFailed = (image) => ({
  type: actionTypes.GET_USER_IMAGE_FAILED,
});
