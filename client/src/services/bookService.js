import axios from "../axios";

//book
const createNewBookSevice = (data) => {
  return axios.post("/api/create-new-book", data);
};

const getBookService = (id) => {
  return axios.get(`/api/get-book?id=${id}`);
}

const deleteBookService = (id) => {
  return axios.delete("/api/delete-book", { data: { id: id } })
}

const editBookService = (book) => {
  console.log(book)
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

//catalog
const createCatalogSevice = (data) => {
  return axios.post("/api/create-catalog", data);
};

const getCatalogService = (id) => {
  return axios.get(`/api/get-catalog?id=${id}`);
}

const deleteCatalogService = (id) => {
  return axios.delete("/api/delete-catalog", { data: { id: id } })
}

const editCatalogService = (catalog) => {
  return axios.put("/api/edit-catalog", catalog)
}


//publisher
const createPublisherSevice = (data) => {
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

// get by name
const getAuthorByNameService = (name) => {
  return axios.get(`/api/get-author-by-name?name=${name}`);
}

const getPublisherByNameService = (name) => {
  return axios.get(`/api/get-publisher-by-name?name=${name}`);
}

const getCategoryByNameService = (name) => {
  return axios.get(`/api/get-category-by-name?name=${name}`);
}
const getCatalogByNameService = (name) => {
  return axios.get(`/api/get-catalog-by-name?name=${name}`);
}

const getTypeByNameService = (name) => {
  return axios.get(`/api/get-type-by-name?name=${name}`);
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

  //catalog
  createCatalogSevice,
  getCatalogService,
  deleteCatalogService,
  editCatalogService,

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

  //get by name
  getAuthorByNameService,
  getPublisherByNameService,
  getCategoryByNameService,
  getCatalogByNameService,
  getTypeByNameService,

};
