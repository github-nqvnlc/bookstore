 import bookService from "../services/bookService";

//Book
let createNewBook = async (req, res) => {
  let message = await bookService.createNewBookService(req.body);
  return res.status(200).json(message);
};
let getBook = async (req, res) => {
  let id = req.query.id;
  let book = await bookService.getBookService(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "oke",
    book,
  });
};
let editBook = async (req, res) => {
  let data = req.body;
  let message = await bookService.editBookService(data);
  return res.status(200).json(message);
};
let deleteBook = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }

  let message = await bookService.deleteBookService(req.body.id);
  return res.status(200).json(message);
};

//Author
let createAuthor = async (req, res) => {
  let message = await bookService.createAuthorService(req.body);
  return res.status(200).json(message);
};
let getAuthor = async (req, res) => {
  let id = req.query.id;
  let author = await bookService.getAuthorService(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "oke",
    author,
  });
};

let editAuthor = async (req, res) => {
  let data = req.body;
  let message = await bookService.editAuthorService(data);
  return res.status(200).json(message);
};
let deleteAuthor = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parameters!",
    });
  }

  let message = await bookService.deleteAuthorService(req.body.id);
  return res.status(200).json(message);
};

//Category
let createCategory = async (req, res) => {
  let message = await bookService.createCategoryService(req.body);
  return res.status(200).json(message);
};
let getCategory = async (req, res) => {
  let id = req.query.id;
  let category = await bookService.getCategoryService(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "oke",
    category,
  });
};
let editCategory = async (req, res) => {
  let data = req.body;
  let message = await bookService.editCategoryService(data);
  return res.status(200).json(message);
};
let deleteCategory = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await bookService.deleteCategoryService(req.body.id);
  return res.status(200).json(message);
};
//Catalog
let createCatalog = async (req, res) => {
  let message = await bookService.createCatalogService(req.body);
  return res.status(200).json(message);
};
let getCatalog = async (req, res) => {
  let id = req.query.id;
  let catalog = await bookService.getCatalogService(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "oke",
    catalog,
  });
};
let editCatalog = async (req, res) => {
  let data = req.body;
  let message = await bookService.editCatalogService(data);
  return res.status(200).json(message);
};
let deleteCatalog = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await bookService.deleteCatalogService(req.body.id);
  return res.status(200).json(message);
};

//Publisher
let createPublisher = async (req, res) => {
  let message = await bookService.createPublisherService(req.body);
  return res.status(200).json(message);
};
let getPublisher = async (req, res) => {
  let id = req.query.id;
  let publisher = await bookService.getPublisherService(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "oke",
    publisher,
  });
};
let editPublisher = async (req, res) => {
  let data = req.body;
  let message = await bookService.editPublisherService(data);
  return res.status(200).json(message);
};
let deletePublisher = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await bookService.deletePublisherService(req.body.id);
  return res.status(200).json(message);
};

//Type
let createType = async (req, res) => {
  let message = await bookService.createTypeService(req.body);
  return res.status(200).json(message);
};
let getType = async (req, res) => {
  let id = req.query.id;
  let type = await bookService.getTypeService(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "oke",
    type,
  });
};
let editType = async (req, res) => {
  let data = req.body;
  let message = await bookService.editTypeService(data);
  return res.status(200).json(message);
};
let deleteType = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await bookService.deleteTypeService(req.body.id);
  return res.status(200).json(message);
};

//get by name
let getAuthorByName = async (req, res) => {
  let name = req.query.name;
  let author = await bookService.getAuthorByNameService(name);
  return res.status(200).json({
    errCode: 0,
    errMessage: "oke",
    author,
  });
};

let getPublisherByName = async (req, res) => {
  let name = req.query.name;
  let publisher = await bookService.getPublisherByNameService(name);
  return res.status(200).json({
    errCode: 0,
    errMessage: "oke",
    publisher,
  });
};
let getCategoryByName = async (req, res) => {
  let name = req.query.name;
  let category = await bookService.getCategoryByNameService(name);
  return res.status(200).json({
    errCode: 0,
    errMessage: "oke",
    category,
  });
};
let getCatalogByName = async (req, res) => {
  let name = req.query.name;
  let catalog = await bookService.getCatalogByNameService(name);
  return res.status(200).json({
    errCode: 0,
    errMessage: "oke",
    catalog,
  });
};
let getTypeByName = async (req, res) => {
  let name = req.query.name;
  let type = await bookService.getTypeByNameService(name);
  return res.status(200).json({
    errCode: 0,
    errMessage: "oke",
    type,
  });
};

module.exports = {
  //Book
  createNewBook: createNewBook,
  getBook: getBook,
  editBook: editBook,
  deleteBook: deleteBook,

  //Author
  getAuthor: getAuthor,
  createAuthor: createAuthor,
  editAuthor: editAuthor,
  deleteAuthor: deleteAuthor,

  //Category
  createCategory: createCategory,
  getCategory: getCategory,
  editCategory: editCategory,
  deleteCategory: deleteCategory,

  //Catalog
  createCatalog: createCatalog,
  getCatalog: getCatalog,
  editCatalog: editCatalog,
  deleteCatalog: deleteCatalog,

  //Publisher
  createPublisher: createPublisher,
  getPublisher: getPublisher,
  editPublisher: editPublisher,
  deletePublisher: deletePublisher,

  //Type
  createType: createType,
  getType: getType,
  editType: editType,
  deleteType: deleteType,

  //get by name
  getAuthorByName: getAuthorByName,
  getPublisherByName: getPublisherByName,
  getCategoryByName: getCategoryByName,
  getCatalogByName: getCatalogByName,
  getTypeByName: getTypeByName,
};
