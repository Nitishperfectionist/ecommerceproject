const express=require("express");
const { getAllProducts,createProduct, updateProducts, deleteProducts, getSingleProductDetails, createProductReview } = require("../controllers/product.controller");
const {isAuthenticatedUser,authorizedRole}=require("../middleware/auth");

const router=express.Router();

router.route("/product").get(getAllProducts);

router.route("/admin/product/new").post(isAuthenticatedUser,authorizedRole("admin"),createProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser,authorizedRole("admin"),updateProducts);
router.route("/admin/product/:id").delete(isAuthenticatedUser,authorizedRole("admin"),deleteProducts);


router.route("/product/:id").get(getSingleProductDetails);

router.route("/reviews").put(isAuthenticatedUser,createProductReview);

module.exports = router;