import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import bookController from "../controllers/bookController";
import categoryController from "../controllers/categoryController";

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
  router.get("/api/getRole", userController.getRole);
  router.get("/api/get-user-image", userController.getUserImage);
  
  // Handle book
  router.get("/api/get-book", bookController.getBook);
  router.post("/api/create-new-book", bookController.createNewBook);
  router.put("/api/edit-book", bookController.editBook);
  router.delete("/api/delete-book", bookController.deleteBook);

  // //Handle Author
  // router.post("/api/create-author", bookController.CreateAuthor);
  // router.get("/api/get-author", bookController.getAuthor);
  // router.put("/api/edit-author", bookController.editAuthor);
  // router.delete("/api/delete-author", bookController.deleteAuthor);

  // //Handle Category
  router.post("/api/create-category", categoryController.createCategory);
  router.get("/api/get-category", categoryController.getCategory);
  router.put("/api/edit-category", categoryController.editCategory);
  router.delete("/api/delete-category", categoryController.deleteCategory);

  // //Handle Publisher
  // router.post("/api/create-publisher", bookController.CreatePublisher);
  // router.get("/api/get-publisher", bookController.getPublisher);
  // router.put("/api/edit-publisher", bookController.editPublisher);
  // router.delete("/api/delete-publisher", bookController.deletePublisher);
  
  // //Handle Type
  // router.post("/api/create-type", bookController.CreateType);
  // router.get("/api/get-type", bookController.getType);
  // router.put("/api/edit-type", bookController.editType);
  // router.delete("/api/delete-type", bookController.deleteType);

  return app.use("/", router);
};

module.exports = initWebRoutes;
