import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import bookController from "../controllers/bookController";
import orderController from "../controllers/orderController";
import paymentController from "../controllers/paymentController";
// import { isAuth, isAdmin, isCustomer, isManager } from "../middleware/authorization";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);

  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  // Handle users
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/get-role", userController.getRole);
  router.get("/api/get-user-image", userController.getUserImage);

  // Handle Book
  router.post("/api/create-new-book", bookController.createNewBook);
  router.get("/api/get-book", bookController.getBook);
  router.put("/api/edit-book", bookController.editBook);
  router.delete("/api/delete-book", bookController.deleteBook);

  // Handle Author
  router.post("/api/create-author", bookController.createAuthor);
  router.get("/api/get-author", bookController.getAuthor);
  router.put("/api/edit-author", bookController.editAuthor);
  router.delete("/api/delete-author", bookController.deleteAuthor);

  // Handle Category
  router.post("/api/create-category", bookController.createCategory);
  router.get("/api/get-category", bookController.getCategory);
  router.put("/api/edit-category", bookController.editCategory);
  router.delete("/api/delete-category", bookController.deleteCategory);
  
  // Handle Catalog
  router.post("/api/create-catalog", bookController.createCatalog);
  router.get("/api/get-catalog", bookController.getCatalog);
  router.put("/api/edit-catalog", bookController.editCatalog);
  router.delete("/api/delete-catalog", bookController.deleteCatalog);

  //Handle Publisher
  router.post("/api/create-publisher", bookController.createPublisher);
  router.get("/api/get-publisher", bookController.getPublisher);
  router.put("/api/edit-publisher", bookController.editPublisher);
  router.delete("/api/delete-publisher", bookController.deletePublisher);

  //Handle Type
  router.post("/api/create-type", bookController.createType);
  router.get("/api/get-type", bookController.getType);
  router.put("/api/edit-type", bookController.editType);
  router.delete("/api/delete-type", bookController.deleteType);

  //get by name
  router.get("/api/get-author-by-name", bookController.getAuthorByName);
  router.get("/api/get-publisher-by-name", bookController.getPublisherByName);
  router.get("/api/get-category-by-name", bookController.getCategoryByName);
  router.get("/api/get-catalog-by-name", bookController.getCatalogByName);
  router.get("/api/get-type-by-name", bookController.getTypeByName);


  //Handle Order 
  router.post("/api/create-order", orderController.createOrder);
  router.get("/api/get-order", orderController.getOrder);
  router.put("/api/edit-order", orderController.editOrder);
  router.delete("/api/delete-order", orderController.deleteOrder);

  //payment
  router.post("/create_payment_url", paymentController.create_payment_url)
  router.get("/vnp_return", paymentController.get_payment_return)

  return app.use("/", router);
};

module.exports = initWebRoutes;
