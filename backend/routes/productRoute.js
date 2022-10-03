const express=require("express")
const { getAllProducts,createProduct, updateProduct,deleteProduct,getProduct, createProductReview, getProductReviews, deleteReview } = require("../constroller/productController")
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")

const productRouter=express.Router()





productRouter.route("/products").get(getAllProducts)
productRouter.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"), createProduct)

productRouter.route("/admin/product/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)

productRouter.route("/product/:id").get(getProduct)

productRouter.route("/review/:productId").get(getProductReviews)
.put(isAuthenticatedUser,createProductReview).delete(isAuthenticatedUser,deleteReview)



module.exports=productRouter

