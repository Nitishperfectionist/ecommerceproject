const express=require("express");
const { getAllProducts,createProduct, updateProducts, deleteProducts } = require("../controllers/product.controller");

const router=express.Router();

router.route("/product").get(getAllProducts);
router.route("/product/new").post(createProduct);
router.route("/product/:id").put(updateProducts);
router.route("/product/:id").delete(deleteProducts);
module.exports=router;