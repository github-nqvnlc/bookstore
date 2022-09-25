import axios from "../axios";

const createNewBookSevice = (data) => {
  console.log(data);
  return axios.post("/api/create-new-book", data);
};

export { createNewBookSevice };
