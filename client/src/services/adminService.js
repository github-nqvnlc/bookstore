import axios from '../axios';


const createNewAccountSevice = (data) => {
    return axios.post('/api/create-new-user', data)
}

const getAllAccountSevice = (inputId, token) => {
    console.log(token)
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const deleteUserSevice = (userId) => {
    return axios.delete('/api/delete-user', { data: { id: userId } });
}

const editAccountSevice = (account) => {
    return axios.put('/api/edit-user', account);
}


export {
    createNewAccountSevice,
    getAllAccountSevice,
    deleteUserSevice,
    editAccountSevice
};