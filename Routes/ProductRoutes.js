const express = require("express")
const productRouter = express.Router()
let {createProduct,getProductById,getProducts,getProductsByPagination,deleteProduct,updateProduct} = require('../Controller/Product')

productRouter.post("/create",createProduct)
productRouter.get('/get/:productId',getProductById)
productRouter.get("/getAll",getProducts)
productRouter.get("/getByPagination",getProductsByPagination)
productRouter.put("/update/:productId",updateProduct)
productRouter.delete("/delete/:productId",deleteProduct)

module.exports = {
  productRouter
}