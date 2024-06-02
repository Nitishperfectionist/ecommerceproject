const express=require("express");
const { getAllProducts,createProduct, updateProducts, deleteProducts, getSingleProductDetails } = require("../controllers/product.controller");
const {isAuthenticatedUser,authorizedRole}=require("../middleware/auth");

const router=express.Router();

router.route("/product").get(getAllProducts);
router.route("/product/new").post(isAuthenticatedUser,authorizedRole("admin"),createProduct);
router.route("/product/:id").put(isAuthenticatedUser,authorizedRole("admin"),updateProducts);
router.route("/product/:id").delete(isAuthenticatedUser,authorizedRole("admin"),deleteProducts);
router.route("/product/:id").get(getSingleProductDetails);

module.exports = router;