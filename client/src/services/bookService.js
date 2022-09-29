import axios from "../axios";

//book
const createNewBookSevice = (data) => {
  console.log(data);
  return axios.post("/api/create-new-book", data);
};

const getBookService = (id) => {
  return axios.get(`/api/get-book?id=${id}`);
}

const deleteBookService = (id) => {
  return axios.delete("/api/delete-book", { data: { id: id } })
}

const editBookService = (book) => {
  return axios.put("/api/edit-book", book)
}


//author
const createAuthorSevice = (data) => {
  console.log(data);
  return axios.post("/api/create-author", data);
};

const getAuthorService = (id) => {
  return axios.get(`/api/get-author?id=${id}`);
}

const deleteAuthorService = (id) => {
  return axios.delete("/api/delete-author", { data: { id: id } })
}

const editAuthorService = (author) => {
  return axios.put("/api/edit-author", author)
}


//category
const createCategorySevice = (data) => {
  console.log(data);
  return axios.post("/api/create-category", data);
};

const getCategoryService = (id) => {
  return axios.get(`/api/get-category?id=${id}`);
}

const deleteCategoryService = (id) => {
  return axios.delete("/api/delete-category", { data: { id: id } })
}

const editCategoryService = (category) => {
  return axios.put("/api/edit-category", category)
}


//publisher
const createPublisherSevice = (data) => {
  console.log(data);
  return axios.post("/api/create-publisher", data);
};

const getPublisherService = (id) => {
  return axios.get(`/api/get-publisher?id=${id}`);
}

const deletePublisherService = (id) => {
  return axios.delete("/api/delete-publisher", { data: { id: id } })
}

const editPublisherService = (publisher) => {
  return axios.put("/api/edit-publisher", publisher)
}


//type
const createTypeSevice = (data) => {
  console.log(data);
  return axios.post("/api/create-type", data);
};

const getTypeService = (id) => {
  return axios.get(`/api/get-type?id=${id}`);
}

const deleteTypeService = (id) => {
  return axios.delete("/api/delete-type", { data: { id: id } })
}

const editTypeService = (type) => {
  return axios.put("/api/edit-type", type)
}


export {

  //book
  createNewBookSevice,
  getBookService,
  deleteBookService,
  editBookService,

  //author
  createAuthorSevice,
  getAuthorService,
  deleteAuthorService,
  editAuthorService,

  //category
  createCategorySevice,
  getCategoryService,
  deleteCategoryService,
  editCategoryService,
  
  //publisher
  createPublisherSevice,
  getPublisherService,
  deletePublisherService,
  editPublisherService,
  
  //type
  createTypeSevice,
  getTypeService,
  deleteTypeService,
  editTypeService,
};
