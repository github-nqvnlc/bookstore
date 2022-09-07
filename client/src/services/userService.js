import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUserSevice = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
}

const createNewUserSevice = (data) => {
  return axios.post('/api/create-new-user', data)
}

const deleteUserSevice = (userId) => {
  return axios.delete('/api/delete-user', { data: { id: userId }});
}

const editUserSevice = (user) => {
  return axios.put('/api/edit-user', user);
}

export { handleLoginApi, getAllUserSevice, createNewUserSevice, deleteUserSevice, editUserSevice };
