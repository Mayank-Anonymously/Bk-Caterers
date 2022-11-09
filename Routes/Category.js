const express = require("express");
const {
  AddCategory,
  GetAllCategory,
  UpdateCategory,
  DeleteCategoryByID,
  GetCategoryByID,
} = require("../Controller/Categories");
const { GetAllLocationsById } = require("../Controller/wed_locations");
const Router = express.Router();

Router.get("/getAllCategories", GetAllCategory);
Router.get("/getCategoryById/:categoryID", GetCategoryByID);
Router.post("/addCategory", AddCategory);
Router.put("/deleteCategory/:categoryID", DeleteCategoryByID);
Router.patch("/updateCategory/:categoryID", UpdateCategory);

module.exports = Router;
