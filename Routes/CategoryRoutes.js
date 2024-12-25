const express = require("express");
const categoryRouter = express.Router();
let {createCategory,getCategories,updateCategory,deleteCategory } = require('../Controller/Category')
categoryRouter.post("/create",createCategory)
categoryRouter.get("/getAll",getCategories)
categoryRouter.put("/update/:categoryId",updateCategory)
categoryRouter.delete("/delete/:categoryId",deleteCategory)

module.exports = {
  categoryRouter
}