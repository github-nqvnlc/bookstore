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
      errCode: 0,
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
};