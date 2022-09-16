import actionTypes from "./actionTypes";
import { getRoleService } from '../../services/userService';
import {
    createNewAccountSevice,
    getAllAccountSevice,
    deleteUserSevice,
    editAccountSevice
} from '../../services/adminService';
import { toast } from "react-toastify";

// export const fetchRoleStart = () => ({
//     type: actionTypes.FETCH_ROLE_START,
// });
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START })

            let res = await getRoleService("role")
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
        }
    }

};
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
});
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});

//create new account
export const createNewAccount = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await createNewAccountSevice(data)
            if (res && res.errCode === 0) {
                toast("Create new account successful!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                dispatch(createAccountSuccess())
                dispatch(getAllAccount())
            } else {
                toast.error(`Edit account error! ${res.errMessage}`, {
                    position: "top-right",
                    autoClose: 3000,
                })
                dispatch(createAccountFailed());
            }
        } catch (e) {
            dispatch(createAccountFailed());
        }
    }

};
export const createAccountSuccess = (data) => ({
    type: actionTypes.CREAT_NEW_ACCOUNT_SUCCESS,
    data: data
});
export const createAccountFailed = () => ({
    type: actionTypes.CREAT_NEW_ACCOUNT_FAILED,
});


//Get all account
export const getAllAccount = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllAccountSevice('ALL')
            if (res && res.errCode === 0) {

                dispatch(getAllAccountSuccess(res.users.reverse()))
            } else {
                dispatch(getAllAccountFailed());
            }
        } catch (e) {
            dispatch(getAllAccountFailed());
        }
    }

};
export const getAllAccountSuccess = (data) => ({
    type: actionTypes.GET_ALL_ACCOUNT_SUCCESS,
    data: data
});
export const getAllAccountFailed = () => ({
    type: actionTypes.GET_ALL_ACCOUNT_FAILED,
});


//Delete account
export const deleteAccount = (id) => {
    return async (dispatch, getState) => {
        try {

            let res = await deleteUserSevice(id)
            if (res && res.errCode === 0) {
                toast(`Delete account successful!`, {
                    position: "top-right",
                    autoClose: 3000,
                })
                dispatch(deleteAccountSuccess())
                dispatch(getAllAccount())
            } else {
                toast.error("Delete account error!", {
                    position: "top-right",
                    autoClose: 3000,
                })
                dispatch(deleteAccountFailed());
            }
        } catch (e) {
            toast.error("Delete account error!", {
                position: "top-right",
                autoClose: 3000,
            })
            dispatch(deleteAccountFailed());
        }
    }

};
export const deleteAccountSuccess = () => ({
    type: actionTypes.DELETE_ACCOUNT_SUCCESS,
});
export const deleteAccountFailed = () => ({
    type: actionTypes.DELETE_ACCOUNT_FAILED,
});

//Edit account
export const editAccount = (account) => {
    return async (dispatch, getState) => {
        try {

            let res = await editAccountSevice(account)
            if (res && res.errCode === 0) {
                toast(`Edit account successful!`, {
                    position: "top-right",
                    autoClose: 3000,
                })
                dispatch(editAccountSuccess())
                dispatch(getAllAccount())
            } else {
                toast.error(`Edit account error! ${res.errMessage}`, {
                    position: "top-right",
                    autoClose: 3000,
                })
                dispatch(editAccountFailed());
            }
        } catch (e) {
            toast.error(`Edit account error! ${e}` , {
                position: "top-right",
                autoClose: 3000,
            })
            dispatch(editAccountFailed());
        }
    }

};
export const editAccountSuccess = () => ({
    type: actionTypes.EDIT_ACCOUNT_SUCCESS,
});
export const editAccountFailed = () => ({
    type: actionTypes.EDIT_ACCOUNT_FAILED,
});

