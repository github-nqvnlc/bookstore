import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const userRegisterSevice = (data) => {
  return axios.post('/api/create-new-user', data);
}

const getRoleService = (inputId) => {
  return axios.get(`/api/getRole?id=${inputId}`)
}

const getUserImageService = (id) => {
  return axios.get(`/api/get-user-image?id=${id}`)
}

export {
  handleLoginApi,
  userRegisterSevice,
  getRoleService,
  getUserImageService
};
